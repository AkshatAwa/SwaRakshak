import { Code, Copy, Check, Terminal, X, Key } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ApiPage() {
  const [copied, setCopied] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

const generateKey = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}/v1/api-keys/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 👇 agar login system baad me aayega to yahin token lagega
          Authorization: "Bearer DEV_SESSION_TOKEN",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to generate API key");

    const data = await res.json();
    setApiKey(data.api_key);
  } catch (err) {
    console.error(err);
    alert("Unable to generate API key. Try again.");
  }
};


  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-serif text-3xl mb-2">Developer Access</h1>
          <p className="text-muted-foreground">
            Integrate Rakshak Legal Engine into your enterprise workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => setShowConsole(true)}
          >
            <Terminal className="w-4 h-4" />
            Developer Console
          </Button>

          <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded text-primary font-mono text-xs">
            API Status: ONLINE
          </div>
        </div>
      </div>

      {/* EXISTING CONTENT */}
      <div className="grid gap-12">
        <section>
          <h2 className="font-heading text-xl mb-6 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Endpoint: Legal Analysis
          </h2>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <span className="text-xs font-mono text-muted-foreground">
                  POST /v1/analyze
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={copyCode}
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </div>

              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-blue-100">
{`curl -X POST http://127.0.0.1:8000/v1/analyze \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-H "Content-Type: application/json" \\
-d '{
  "query": "Can a minor enter into a contract?",
  "jurisdiction": "IN"
}'`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==============================
         DEVELOPER CONSOLE TAB
      =============================== */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              className="w-full max-w-3xl bg-[#0d1117] border border-white/10 rounded-xl shadow-xl"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-sm text-primary">
                  <Terminal className="w-4 h-4" />
                  Rakshak Developer Console
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConsole(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-6 text-sm text-muted-foreground font-mono">
                <div>
                  <p className="text-foreground mb-2">
                    How to use Rakshak API
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use Authorization header with API key</li>
                    <li>POST queries to /v1/analyze</li>
                    <li>Jurisdiction defaults to IN</li>
                    <li>Responses include citations & risk</li>
                  </ul>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-foreground mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API Key
                  </p>

                  {apiKey ? (
                    <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded px-4 py-3">
                      <span className="text-emerald-400">
                        {apiKey}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(apiKey)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={generateKey}
                      className="flex items-center gap-2"
                    >
                      <Key className="w-4 h-4" />
                      Generate API Key
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
