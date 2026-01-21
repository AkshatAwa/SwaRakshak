import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FileText,
  Wand2,
  PlusCircle,
  ShieldAlert,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ===============================
   TYPES
================================ */
type DraftMode = "default" | "custom" | null;
type PreviewMode = "json" | "pdf";

type DefaultDraftFormData = {
  party1_name: string;
  party1_short_name: string;
  party1_address: string;
  party2_name: string;
  party2_address: string;
  proposed_transaction: string;
  execution_date: string;
};

/* ===============================
   API CONFIG
================================ */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const API_KEY =
  "b691e1264770c105705452ee8b565ac49835c2187b427ef723a42144f5c4dae6";

/* ===============================
   MAIN PAGE
================================ */
export default function LegalDraftPage() {
  const [draftMode, setDraftMode] = useState<DraftMode>(null);

  const [formData, setFormData] = useState<DefaultDraftFormData>({
    party1_name: "",
    party1_short_name: "",
    party1_address: "",
    party2_name: "",
    party2_address: "",
    proposed_transaction: "",
    execution_date: "",
  });

  const [customClausePrompt, setCustomClausePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [previewMode, setPreviewMode] = useState<PreviewMode>("pdf");
  const [jsonPreview, setJsonPreview] = useState<any>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  // ✅ NEW STATE (ONLY ADDITION)
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);

  useEffect(() => {
    const mode = sessionStorage.getItem("draftMode") as DraftMode;
    setDraftMode(mode);
  }, []);

  useEffect(() => {
    if (formData.party1_name && !formData.party1_short_name) {
      setFormData((prev) => ({
        ...prev,
        party1_short_name: prev.party1_name.split(" ")[0],
      }));
    }
  }, [formData.party1_name]);

  const previewAll = async () => {
    setLoading(true);
    try {
      const endpoint =
        draftMode === "custom"
          ? "/v1/draft/custom/preview-pdf"
          : "/v1/draft/default/preview-pdf";

      const payload =
        draftMode === "custom"
          ? { base_data: formData, clause_prompt: customClausePrompt }
          : formData;

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setJsonPreview(data);

      // ✅ REJECTION HANDLING (ONLY LOGIC ADD)
      if (draftMode === "custom" && data.status === "Rejected") {
        setRejectionMessage(
          "This clause cannot be added as it violates applicable Indian law."
        );
        setFileId(null);
        setPdfPreviewUrl(null);
        return;
      } else {
        setRejectionMessage(null);
      }

      const id = data.download_url.split("/").pop();
      setFileId(id);
      setPreviewMode("pdf");
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      if (!fileId) return;

      const res = await fetch(`${API_BASE}/v1/draft/download/${fileId}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfPreviewUrl(url);
    };

    loadPdf();
    return () => {
      if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
    };
  }, [fileId]);

  const downloadPDF = async () => {
    if (!fileId) return;

    const res = await fetch(`${API_BASE}/v1/draft/download/${fileId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "nda.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!draftMode) {
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center">
        <span className="text-muted-foreground font-mono">
          No draft mode selected.
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] p-8 bg-gradient-to-br from-[#0b0f14] via-[#0f141b] to-black">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 bg-[#0f141b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
          <header className="flex items-center gap-3 mb-10">
            {draftMode === "default" ? (
              <FileText className="w-6 h-6 text-primary" />
            ) : (
              <Wand2 className="w-6 h-6 text-primary" />
            )}
            <h1 className="text-2xl text-white">
              {draftMode === "default"
                ? "Non-Disclosure Agreement Generator"
                : "Custom Clause Drafting Workspace"}
            </h1>
          </header>

          {draftMode === "default" ? (
            <DefaultDraftForm
              formData={formData}
              setFormData={setFormData}
              onGenerate={previewAll}
              loading={loading}
            />
          ) : (
            <CustomClauseEditor
              formData={formData}
              setFormData={setFormData}
              clausePrompt={customClausePrompt}
              setClausePrompt={setCustomClausePrompt}
              onPreview={previewAll}
            />
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center gap-2 text-sm text-primary">
              <ShieldAlert className="w-4 h-4" />
              Compliant (IN)
            </div>
          </div>

          <Button
            className="w-full"
            onClick={downloadPDF}
            disabled={!fileId}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>

          <AnimatePresence mode="wait">
            {(jsonPreview || rejectionMessage) && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl border border-white/10 bg-black overflow-hidden"
              >
                {/* TYPEWRITER REJECTION */}
                {rejectionMessage && (
                  <TypewriterMessage text={rejectionMessage} />
                )}

                {!rejectionMessage && (
                  <>
                    <div className="flex border-b border-white/10">
                      <button
                        onClick={() => setPreviewMode("json")}
                        className={`flex-1 py-2 text-sm ${
                          previewMode === "json"
                            ? "bg-white/10 text-white"
                            : "text-white/50"
                        }`}
                      >
                        JSON
                      </button>
                      <button
                        onClick={() => setPreviewMode("pdf")}
                        className={`flex-1 py-2 text-sm ${
                          previewMode === "pdf"
                            ? "bg-white/10 text-white"
                            : "text-white/50"
                        }`}
                      >
                        PDF
                      </button>
                    </div>

                    <div className="h-[420px]">
                      {previewMode === "json" && (
                        <pre className="h-full overflow-auto p-4 text-xs text-white/80">
                          {JSON.stringify(jsonPreview, null, 2)}
                        </pre>
                      )}

                      {previewMode === "pdf" && pdfPreviewUrl && (
                        <iframe
                          src={pdfPreviewUrl}
                          className="w-full h-full"
                          title="PDF Preview"
                        />
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ===============================
   TYPEWRITER MESSAGE
================================ */
function TypewriterMessage({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="m-4 rounded-lg border border-red-900/40 bg-red-950/30 p-4 text-red-400 text-sm font-mono"
    >
      {displayed}
      <span className="animate-pulse">▍</span>
    </motion.div>
  );
}

/* ===============================
   FORMS (UNCHANGED)
================================ */
function DefaultDraftForm({ formData, setFormData, onGenerate, loading }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            className="w-full rounded-lg bg-[#0b0f14] border border-white/20 px-4 py-3 text-white"
            placeholder={key.replaceAll("_", " ")}
            value={String(value ?? "")}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
          />
        ))}
      </div>

      <Button onClick={onGenerate} disabled={loading}>
        Generate Preview
      </Button>
    </div>
  );
}

function CustomClauseEditor({
  formData,
  setFormData,
  clausePrompt,
  setClausePrompt,
  onPreview,
}: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <input
            key={key}
            className="w-full rounded-lg bg-[#0b0f14] border border-white/20 px-4 py-3 text-white"
            placeholder={key.replaceAll("_", " ")}
            value={String(value ?? "")}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
          />
        ))}
      </div>

      <textarea
        rows={4}
        className="w-full rounded-xl bg-[#0b0f14] border border-white/20 p-5 text-white"
        placeholder="Describe the custom clause you want to add…"
        value={clausePrompt}
        onChange={(e) => setClausePrompt(e.target.value)}
      />

      <Button onClick={onPreview} className="flex items-center gap-2">
        <PlusCircle className="w-4 h-4" />
        Analyze & Preview
      </Button>
    </div>
  );
}
