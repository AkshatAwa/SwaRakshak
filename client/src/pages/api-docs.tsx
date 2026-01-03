import { Code, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ApiPage() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="font-serif text-3xl mb-2">Developer Access</h1>
          <p className="text-muted-foreground">Integrate Rakshak Legal Engine into your enterprise workflow.</p>
        </div>
        <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded text-primary font-mono text-xs">
          API Status: ONLINE
        </div>
      </div>

      <div className="grid gap-12">
        <section>
          <h2 className="font-heading text-xl mb-6 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Endpoint: Legal Analysis
          </h2>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-[#0d1117] border border-white/10 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">POST /v1/engine/analyze</span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={copyCode}>
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
              
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-blue-100">
{`curl -X POST https://api.rakshak.ai/v1/engine/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "Can a minor enter into a contract?",
    "jurisdiction": "IN",
    "role_context": "business",
    "risk_tolerance": "strict"
  }'`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
            <h3 className="font-bold mb-4">Rate Limits</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Free Tier</span>
                <span className="text-foreground">100 req/day</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-2">
                <span>Business</span>
                <span className="text-foreground">10,000 req/day</span>
              </li>
              <li className="flex justify-between">
                <span>Enterprise</span>
                <span className="text-foreground">Unlimited</span>
              </li>
            </ul>
          </div>
          
          <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
            <h3 className="font-bold mb-4">Response Schema</h3>
            <pre className="font-mono text-xs text-muted-foreground bg-black/20 p-4 rounded">
{`{
  "id": "ana_123...",
  "analysis": "string",
  "citations": [
    {
      "source": "string",
      "authority_level": "supreme_court"
    }
  ],
  "risk_score": 0.85
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
