import { motion } from "framer-motion";
import { Link } from "wouter";
import { User, Building2, PenTool, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "citizen",
    title: "Citizen",
    icon: User,
    desc: "Personal legal guidance, rights awareness, and civil dispute clarity.",
    accessLevel: "Level 1"
  },
  {
    id: "business",
    title: "Business",
    icon: Building2,
    desc: "Commercial contracts, compliance checks, and regulatory risk assessment.",
    accessLevel: "Level 2"
  },
  {
    id: "drafter",
    title: "Legal Drafter",
    icon: PenTool,
    desc: "Clause validation, NDA generation support, and precision drafting tools.",
    accessLevel: "Level 3"
  },
  {
    id: "govt",
    title: "Government / PSU",
    icon: Landmark,
    desc: "Policy analysis, public sector compliance, and authoritative sourcing.",
    accessLevel: "Level 4 (Restricted)"
  }
];

export default function RoleSelectionPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">Authentication Required</span>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Select User Profile</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The Rakshak Legal Reasoning Engine adapts its output based on your selected role to ensure contextually relevant and safe responses.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {roles.map((role, i) => {
          const roleImages = {
            citizen: 'https://images.unsplash.com/photo-1531053326607-9d349096d887?q=80&w=800&auto=format&fit=crop',
            business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
            drafter: 'https://images.unsplash.com/photo-1503551723145-6c040742065b?q=80&w=800&auto=format&fit=crop',
            govt: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop'
          };

          return (
            <Link key={role.id} href={`/chat?role=${role.id}`} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col p-8 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/50 transition-all cursor-none interactive h-full overflow-hidden"
              >
                <img 
                  src={roleImages[role.id as keyof typeof roleImages]} 
                  alt={role.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                
                <div className="relative z-10">
                  <div className="absolute top-0 right-0 font-mono text-[10px] text-muted-foreground/50 border border-white/5 px-2 py-1 rounded">
                    {role.accessLevel}
                  </div>

                  <div className="mb-6 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <role.icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {role.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {role.desc}
                  </p>

                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Initialize <span className="ml-2">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
