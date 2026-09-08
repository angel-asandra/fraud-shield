import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/recovery-services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 filament-border border-t-0 border-x-0 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:glow-cobalt transition-all duration-300">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-foreground">SENTINEL</span>
              <span className="text-[10px] block -mt-1 text-muted-foreground tracking-widest uppercase">Investigations</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/5'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/track-case">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                <Search className="w-4 h-4" />
                Track Case
              </Button>
            </Link>
            <Link to="/report">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 glow-cobalt">
                <FileText className="w-4 h-4" />
                Report a Scam
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-md ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Link to="/track-case" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full gap-2">
                    <Search className="w-4 h-4" />
                    Track Case
                  </Button>
                </Link>
                <Link to="/report" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground gap-2">
                    <FileText className="w-4 h-4" />
                    Report a Scam
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}