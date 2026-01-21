import { motion } from "framer-motion";
import { FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function DraftModeSelect() {
  const [, navigate] = useLocation();

  const selectMode = (mode: "default" | "custom") => {
    sessionStorage.setItem("draftMode", mode);
    navigate("/draft/workspace");
  };

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-background/60 backdrop-blur border border-white/10 rounded-xl p-10"
      >
        <h2 className="text-xl font-mono mb-8 text-center">
          Choose Draft Generation Mode
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* DEFAULT */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-lg border border-white/10 bg-white/5 cursor-pointer"
            onClick={() => selectMode("default")}
          >
            <FileText className="w-6 h-6 mb-4" />
            <h3 className="font-mono mb-2">Default Clause Maker</h3>
            <p className="text-sm text-muted-foreground">
              Generate a legally structured NDA using predefined compliant clauses.
            </p>
          </motion.div>

          {/* CUSTOM */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 rounded-lg border border-primary/30 bg-primary/10 cursor-pointer"
            onClick={() => selectMode("custom")}
          >
            <Wand2 className="w-6 h-6 mb-4" />
            <h3 className="font-mono mb-2">Custom Clause Maker</h3>
            <p className="text-sm text-muted-foreground">
              Add AI-generated clauses with legal validation and risk analysis.
            </p>
          </motion.div>

        </div>

        <p className="mt-6 text-xs text-center text-muted-foreground">
          You can switch modes later while drafting.
        </p>
      </motion.div>
    </div>
  );
}
