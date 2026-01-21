import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  FileText,
  ShieldAlert,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/* ===============================
   ENV + API CONFIG
================================ */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const API_KEY =
  "b691e1264770c105705452ee8b565ac49835c2187b427ef723a42144f5c4dae6";

/* ===============================
   TYPES
================================ */
type Message = {
  id: string;
  type: "user" | "system";
  content: string;
  metadata?: {
    risk?: string;
    confidence?: number;
    citations?: string[];
  };
};

/* ===============================
   MAIN COMPONENT
================================ */
export default function ChatPage() {

  
  const getIndianKanoonUrl = (citation: string) => {
  const encoded = encodeURIComponent(citation);
  return `https://indiankanoon.org/search/?formInput=${encoded}`;
};
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const role = searchParams.get("role") || "citizen";

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "system",
      content: `Rakshak Engine initialized.
Role set to: ${role.toUpperCase()}
Awaiting legal query for analysis.`,
    },
  ]);
  const shouldAutoScrollRef = useRef(false);
  const [isTyping, setIsTyping] = useState(false);
  const [openAuthorities, setOpenAuthorities] = useState<string[] | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  /* ===============================
     SEND QUERY (UNCHANGED)
  ================================ */
  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/v1/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          query: userMessage.content,
          jurisdiction: "IN",
        }),
      });

      const data = await response.json();

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content:
          data.answer ||
          data.analysis ||
          "No analysis returned by engine.",
        metadata: {
          risk: data.risk_level,
          confidence: data.confidence,
          citations: data.citations?.map(
            (c: any) => `${c.statute} – ${c.identifier}`
          ),
        },
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "system",
          content: "⚠️ Failed to fetch response from backend.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };


  /* ===============================
     AUTO SCROLL (SYSTEM ONLY)
  ================================ */
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.type === "system") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  

  /* ===============================
     UI
  ================================ */
  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden flex bg-black/40">
      {/* LEFT PANEL */}
      <div className="hidden md:flex w-80 border-r border-white/10 bg-background/50 backdrop-blur-sm p-6 flex-col gap-6">
        <div>
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 rounded bg-white/5 border border-white/5">
              <span>Engine</span>
              <span className="text-emerald-500 text-xs">Online</span>
            </div>
            <div className="flex justify-between p-3 rounded bg-white/5 border border-white/5">
              <span>Role</span>
              <span className="text-primary text-xs uppercase">{role}</span>
            </div>
            <div className="flex justify-between p-3 rounded bg-white/5 border border-white/5">
              <span>Jurisdiction</span>
              <span className="text-xs text-muted-foreground">IN-LAW</span>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Active Modules
          </h3>
          {[
            "Penal Code Parser",
            "Civil Liability Check",
            "Contract Validator",
            "Risk Assessor",
          ].map((mod) => (
            <div
              key={mod}
              className="flex items-center gap-2 text-sm text-muted-foreground py-1"
            >
              <Terminal className="w-3 h-3" />
              {mod}
            </div>
          ))}
        </div>
      </div>

      {/* CHAT PANEL */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col gap-2",
                  msg.type === "user" ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg p-4 font-mono text-sm",
                    msg.type === "user"
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-white/5 border border-white/10"
                  )}
                >
                  {msg.content}
                </div>

                {msg.type === "system" && msg.metadata && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[85%]">
                    {/* RISK BOX (FIXED SIZE) */}
                    <div className="h-20 p-3 rounded border border-red-900/40 bg-red-950/20 text-red-400 flex gap-2">
                      <ShieldAlert className="w-4 h-4 mt-0.5" />
                      <span className="text-xs">
                        Risk Level: {msg.metadata.risk}
                      </span>
                    </div>

                    {/* AUTHORITIES BOX */}
                    <div
                      onClick={() =>
                        setOpenAuthorities(msg.metadata!.citations || [])
                      }
                      className="relative h-20 p-3 rounded border border-white/10 bg-white/5 cursor-pointer group overflow-hidden"
                    >
                      <div className="flex gap-2 text-xs mb-1">
                        <FileText className="w-3 h-3" />
                        Authorities
                      </div>

                      <ul className="text-xs list-disc list-inside max-h-10 overflow-hidden">
                        {msg.metadata.citations
                          ?.slice(0, 2)
                          .map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                      </ul>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs font-mono opacity-0 group-hover:opacity-100 transition">
                        View all relevant sections
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <div className="text-primary/60 text-sm font-mono">
                Analyzing…
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* INPUT */}
        <div className="p-6 border-t border-white/10 bg-background/80">
          <div className="max-w-3xl mx-auto relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Enter legal query..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 font-mono text-sm"
            />
            <Button
              onClick={handleSend}
              className="absolute right-2 top-2 h-10 w-10 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* COMMAND STYLE AUTHORITIES PANEL */}
      <AnimatePresence>
        {openAuthorities && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenAuthorities(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-xl bg-background border border-white/10 rounded-xl shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <span className="font-mono text-sm uppercase">
                  Relevant Legal Sections
                </span>
                <button onClick={() => setOpenAuthorities(null)}>
                  <X className="w-4 h-4 opacity-70 hover:opacity-100" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 text-sm font-mono">
                {openAuthorities.map((c, i) => {
                  const url = `https://indiankanoon.org/search/?formInput=${encodeURIComponent(c)}`;

                  return (
                    <div
                      key={i}
                      onClick={() => window.open(url, "_blank")}
                      className="p-3 rounded bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 hover:underline transition font-mono"
                    >
                      {c}
                    </div>
                  );
                })}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
