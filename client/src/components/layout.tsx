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

      <footer className="border-t border-white/5 bg-black/20 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm text-muted-foreground">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-heading font-bold tracking-wider">RAKSHAK</span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed">
              Production-grade Legal Reasoning Engine designed for absolute precision and hallucination-free legal interpretation under Indian Law.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary">Legal Reasoning Engine</a></li>
              <li><a href="#" className="hover:text-primary">Contract Analysis</a></li>
              <li><a href="#" className="hover:text-primary">Conflict Checking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-xs">Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-primary">Indian Penal Code</a></li>
              <li><a href="#" className="hover:text-primary">Contract Act</a></li>
              <li><a href="#" className="hover:text-primary">Data Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-xs">System</h4>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
