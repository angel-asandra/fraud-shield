import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "After losing my retirement savings to an investment scam, I felt hopeless. Sentinel's team traced the funds within weeks and recovered 78% of my losses.",
    author: "R.M.",
    detail: "Investment Fraud — $145,000 Recovered",
  },
  {
    text: "The investigators were professional and thorough. They kept me informed at every step and treated my case with the urgency it deserved.",
    author: "S.K.",
    detail: "Crypto Scam — Case Resolved",
  },
  {
    text: "I was skeptical at first, but the team's expertise in blockchain tracing was remarkable. They found the scammer's wallet and coordinated with authorities.",
    author: "J.D.",
    detail: "Romance Scam — Recovery in Progress",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Client Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Verified Recovery Stories</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real outcomes from real cases. Client identities protected for security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-xl filament-border bg-card/50 relative"
            >
              <Quote className="w-8 h-8 text-primary/10 absolute top-4 right-4" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted-foreground font-mono">{t.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}