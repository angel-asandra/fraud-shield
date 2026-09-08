import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card p-12 md:p-16 filament-border overflow-hidden"
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(46,91,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,91,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Don't Let Scammers Win
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Every minute counts in fraud recovery. Report your case now and let our 
              investigation team begin tracing your losses immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8 glow-cobalt-strong">
                  <FileText className="w-5 h-5" />
                  File a Report Now
                </Button>
              </Link>
              <Link to="/recovery-services">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8 border-border/50">
                  Learn Our Process
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}