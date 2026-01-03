import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Scale, Lock, FileSearch } from "lucide-react";
import heroBg from "@assets/generated_images/abstract_premium_legal_tech_background_dark_navy_gold.png";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Production Grade Legal AI
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6">
              Legal Clarity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50 animate-gradient-x">
                Not Just Advice.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              The first hallucination-safe Legal Reasoning Engine for Indian Law. 
              Designed for citizens, businesses, and government authorities.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/roles">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 min-w-[200px] h-14 text-base interactive shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Initialize Console
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 min-w-[200px] h-14 text-base interactive backdrop-blur-sm">
                  System Architecture
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to verify</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* Trust Grid */}
      <section className="py-24 relative z-10 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-primary" />,
                title: "Hallucination Safe",
                desc: "Strictly bound by Indian Penal Code & Contract Act. No creative interpretations."
              },
              {
                icon: <Scale className="w-8 h-8 text-primary" />,
                title: "Production Grade",
                desc: "Architected for high-concurrency enterprise and government deployment."
              },
              {
                icon: <Lock className="w-8 h-8 text-primary" />,
                title: "Role-Aware Security",
                desc: "Dynamic response filtering based on user authorization level."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-[1px] rounded-xl overflow-hidden animate-border-rotate-always shadow-2xl"
              >
                <div className="animate-border-rotate-content p-8 rounded-xl border border-white/5 bg-background hover:bg-white/[0.04] transition-colors interactive h-full">
                  <div className="mb-6 p-4 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-24 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block">System Intelligence</span>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight">Advanced Legal Reasoning Modules</h2>
            </div>
            <Link href="/about">
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto interactive uppercase tracking-widest text-xs font-bold group">
                View Full Documentation <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Criminal Procedure Analyzer",
                category: "CRPC / BNSS",
                image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
                desc: "Real-time mapping of procedural compliance across state jurisdictions."
              },
              {
                title: "Contract Risk Scoring",
                category: "MERCANTILE LAW",
                image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
                desc: "Automated identification of unfavorable clauses and indemnity gaps."
              },
              {
                title: "Constitutional Benchmarking",
                category: "SOVEREIGN RIGHTS",
                image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800&auto=format&fit=crop",
                desc: "Direct referencing of Supreme Court precedence for fundamental rights."
              }
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden interactive"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={module.image} 
                    alt={module.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-primary tracking-widest uppercase">
                      {module.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 relative">
                  <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {module.desc}
                  </p>
                  <div className="w-12 h-px bg-primary/30 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Teaser */}
      <section className="py-24 border-t border-white/5 bg-gradient-to-b from-background to-black/40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-5xl mb-16">Who are you verifying for?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                role: 'Citizen',
                image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=800&auto=format&fit=crop',
                label: '01'
              },
              {
                role: 'Business',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
                label: '02'
              },
              {
                role: 'Drafter',
                image: 'https://images.unsplash.com/photo-1503551723145-6c040742065b?q=80&w=800&auto=format&fit=crop',
                label: '03'
              },
              {
                role: 'Government',
                image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800&auto=format&fit=crop',
                label: '04'
              }
            ].map((item, i) => (
              <Link 
                key={item.role} 
                href="/roles" 
                className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 interactive block shadow-2xl animate-border-rotate"
              >
                <div className="animate-border-rotate-content rounded-2xl overflow-hidden bg-background">
                  <img 
                    src={item.image} 
                    alt={item.role}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                    <span className="text-[10px] font-mono text-primary/70 mb-2 block tracking-[0.3em]">{item.label}</span>
                    <h3 className="font-heading text-2xl font-bold group-hover:text-primary transition-colors tracking-tight">{item.role}</h3>
                    <div className="w-8 h-1 bg-primary mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
