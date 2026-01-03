import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { CustomCursor } from "./ui/custom-cursor";
import { Button } from "./ui/button";
import { Menu, X, Shield, Gavel, FileText, Code } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/roles", label: "Select Role" },
    { href: "/chat", label: "Console" },
    { href: "/about", label: "Protocol" },
    { href: "/api", label: "API Access" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <CustomCursor />
      
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 interactive group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-sm border border-white/10 group-hover:border-primary/50 transition-colors">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-wider uppercase">Rakshak</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Sovereign AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm uppercase tracking-widest hover:text-primary transition-colors interactive relative py-2",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
                {location === link.href && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-primary" 
                  />
                )}
              </Link>
            ))}
            <Link href="/chat">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 interactive uppercase tracking-wider text-xs font-bold">
                Launch Console
              </Button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden interactive text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-2xl font-heading font-bold text-foreground hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 min-h-screen">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-black/40 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(45_93%_47%_/_0.03),transparent_40%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3 interactive group w-fit">
                <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-sm border border-white/10 group-hover:border-primary/50 transition-colors">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl tracking-wider uppercase">Rakshak</span>
                  <span className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">Sovereign AI</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                The definitive legal reasoning engine for the Indian jurisdiction. Built for absolute precision, zero hallucination, and sovereign compliance.
              </p>
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all interactive">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-current opacity-70" style={{ maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${social}.svg)`, maskSize: 'contain', maskRepeat: 'no-repeat' }} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">Engine</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/chat?role=citizen" className="text-muted-foreground hover:text-primary transition-colors interactive">Citizen Console</Link></li>
                <li><Link href="/chat?role=business" className="text-muted-foreground hover:text-primary transition-colors interactive">Enterprise Portal</Link></li>
                <li><Link href="/chat?role=govt" className="text-muted-foreground hover:text-primary transition-colors interactive">Government Access</Link></li>
                <li><Link href="/api" className="text-muted-foreground hover:text-primary transition-colors interactive">API Documentation</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">Protocol</h4>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors interactive">Reasoning Logic</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors interactive">Data Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors interactive">Hallucination Benchmarks</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors interactive">Sovereign Cloud</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-foreground mb-6 uppercase tracking-[0.2em] text-xs">System Status</h4>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Global Systems Nominal</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/50 leading-tight">
                  CURRENT VERSION: v1.0.4-SOVEREIGN<br />
                  LAST UPDATE: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
            <span>© 2026 RAKSHAK TECHNOLOGIES. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary transition-colors">Terms of Protocol</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Shield</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
