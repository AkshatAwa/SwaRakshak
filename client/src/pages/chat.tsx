import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertTriangle, CheckCircle2, FileText, Search, ShieldAlert, ChevronRight, Minimize2, Settings, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock response generation (simulating the "Backend")
const simulateResponse = (role: string, query: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analysis: "Based on the Indian Contract Act, 1872, specific performance of a contract cannot be enforced if the contract depends on the personal qualifications or volition of the parties.",
        risk: role === 'business' ? "High" : "Moderate",
        confidence: 94.2,
        citations: ["Section 14(b), Specific Relief Act, 1963", "Supreme Court: Percept D'Mark (India) Pvt. Ltd. v. Zaheer Khan"]
      });
    }, 2000);
  });
};

type Message = {
  id: string;
  type: 'user' | 'system';
  content: string;
  metadata?: {
    risk?: string;
    confidence?: number;
    citations?: string[];
  };
};

export default function ChatPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const role = searchParams.get('role') || 'citizen';
  
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      type: 'system',
      content: `Rakshak Engine initialized. Role set to: ${role.toUpperCase()}. \nAwaiting legal query for analysis.`
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    // Simulate backend call
    const response: any = await simulateResponse(role, query);
    
    const sysMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: 'system',
      content: response.analysis,
      metadata: {
        risk: response.risk,
        confidence: response.confidence,
        citations: response.citations
      }
    };

    setIsTyping(false);
    setMessages(prev => [...prev, sysMsg]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden flex flex-col md:flex-row bg-black/40">
      
      {/* LEFT PANEL: Context & Status */}
      <div className="w-full md:w-80 border-r border-white/10 bg-background/50 backdrop-blur-sm p-6 hidden md:flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
              <span className="text-sm font-medium">Engine</span>
              <div className="flex items-center gap-2 text-xs text-emerald-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
              <span className="text-sm font-medium">Role</span>
              <span className="text-xs font-mono text-primary uppercase">{role}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
              <span className="text-sm font-medium">Jurisdiction</span>
              <span className="text-xs font-mono text-muted-foreground">IN-LAW</span>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">Active Modules</h3>
          <div className="space-y-2">
            {['Penal Code Parser', 'Civil Liability Check', 'Contract Validator', 'Risk Assessor'].map((mod) => (
              <div key={mod} className="flex items-center gap-3 text-sm text-muted-foreground/80 py-1">
                <Terminal className="w-3 h-3" />
                {mod}
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-muted-foreground/40 font-mono">
          Session ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </div>
      </div>

      {/* CENTER PANEL: Chat Interface */}
      <div className="flex-1 flex flex-col relative">
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-8 pb-20">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col gap-2",
                  msg.type === 'user' ? "items-end" : "items-start"
                )}
              >
                <div className={cn(
                  "max-w-[85%] rounded-lg p-4 font-mono text-sm leading-relaxed",
                  msg.type === 'user' 
                    ? "bg-primary/10 border border-primary/20 text-primary-foreground" 
                    : "bg-white/5 border border-white/10 text-foreground"
                )}>
                  {msg.content}
                </div>

                {/* Metadata for System Messages */}
                {msg.type === 'system' && msg.metadata && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-full max-w-[85%] mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    {/* Risk Indicator */}
                    <div className={cn(
                      "p-3 rounded border flex items-center gap-3",
                      msg.metadata.risk === 'High' ? "border-red-900/50 bg-red-950/20 text-red-400" : "border-emerald-900/50 bg-emerald-950/20 text-emerald-400"
                    )}>
                      <ShieldAlert className="w-4 h-4" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider opacity-70">Risk Assessment</span>
                        <span className="font-bold text-sm">{msg.metadata.risk} Risk Detected</span>
                      </div>
                    </div>

                    {/* Citations */}
                    <div className="p-3 rounded border border-white/5 bg-white/5 text-muted-foreground">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-3 h-3" />
                        <span className="text-[10px] uppercase tracking-wider opacity-70">Primary Authorities</span>
                      </div>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        {msg.metadata.citations?.map((cit, i) => (
                          <li key={i}>{cit}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3 text-primary/50">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-75" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce delay-150" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* INPUT AREA */}
        <div className="p-6 bg-background/80 backdrop-blur-md border-t border-white/10">
          <div className="max-w-3xl mx-auto relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter legal query or context..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-6 pr-14 py-4 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-mono text-sm"
            />
            <Button 
              onClick={handleSend}
              className="absolute right-2 top-2 h-10 w-10 p-0 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 interactive"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="max-w-3xl mx-auto mt-2 flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>Rakshak v1.0.4</span>
            <span>Not Legal Advice • Verify with Counsel</span>
          </div>
        </div>
      </div>

    </div>
  );
}
