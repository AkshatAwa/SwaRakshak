import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-4xl mb-8">System Architecture & Protocol</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            SwaRakshak is built on a fundamental principle: <span className="text-primary">Code is Law, but Law is not Code.</span> It requires nuance, context, and a deep understanding of jurisdiction.
          </p>

          <div className="grid md:grid-cols-2 gap-12 my-12">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-primary">The Core Engine</h3>
              <p className="text-sm text-muted-foreground">
                Unlike general purpose LLMs, Rakshak uses a constrained reasoning engine specifically trained on the Indian Constitution, IPC, CrPC, and 50 years of Supreme Court judgments. It does not "think" creatively; it retrieves and synthesizes authoritative sources.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-primary">Safety Protocols</h3>
              <p className="text-sm text-muted-foreground">
                Every response passes through three safety layers:
                1. Hallucination Check (Source Verification)
                2. Jurisdiction Lock (India Only)
                3. Role-Based Filtering (Information appropriate for the user)
              </p>
            </div>
          </div>

          <hr className="border-white/10 my-12" />

          <h3 className="font-heading text-2xl mb-6">Supported Frameworks</h3>
          <ul className="grid grid-cols-2 gap-4 text-sm font-mono text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Indian Penal Code (IPC)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Code of Criminal Procedure
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Indian Contract Act, 1872
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Information Technology Act
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Specific Relief Act
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              Constitution of India
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
