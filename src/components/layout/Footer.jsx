import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card filament-border border-b-0 border-x-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight">SENTINEL</span>
                <span className="text-[10px] block -mt-1 text-muted-foreground tracking-widest uppercase">Investigations</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional fraud investigation and recovery services. Helping victims reclaim what was taken.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>256-bit Encrypted Communications</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Services</h4>
            <div className="space-y-2.5">
              <Link to="/report" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Report a Scam</Link>
              <Link to="/track-case" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Track Your Case</Link>
              <Link to="/recovery-services" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Recovery Process</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
            <div className="space-y-2.5">
              <Link to="/about" className="block text-sm text-foreground/70 hover:text-primary transition-colors">About Us</Link>
              <Link to="/contact" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Contact</h4>
            <div className="space-y-2.5">
              <a href="mailto:info@sentinel-recovery.com" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" />
                info@sentinel-recovery.com
              </a>
              <a href="tel:+18005551234" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +1 (800) 555-1234
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sentinel Investigations. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Legal Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}