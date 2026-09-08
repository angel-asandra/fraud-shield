import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield, Eye, Globe, Server, Fingerprint } from 'lucide-react';

const badges = [
  { icon: Lock, label: '256-bit Encryption' },
  { icon: Shield, label: 'GDPR Compliant' },
  { icon: Eye, label: 'Confidential Handling' },
  { icon: Globe, label: 'International Reach' },
  { icon: Server, label: 'Secure Data Centers' },
  { icon: Fingerprint, label: '2FA Authentication' },
];

export default function TrustBadges() {
  return (
    <section className="py-16 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Security & Compliance</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex flex-col items-center gap-2.5 p-4 rounded-lg bg-muted/20 filament-border"
            >
              <badge.icon className="w-5 h-5 text-primary/70" />
              <span className="text-[11px] font-medium text-muted-foreground text-center leading-tight">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}