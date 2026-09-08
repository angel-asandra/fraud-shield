import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Search, Shield, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Forensic cybersecurity lab with blue fiber optic lights"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(46,91,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,91,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
            <span className="text-xs font-medium text-muted-foreground tracking-wide">ACTIVE INVESTIGATION UNIT</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Helping Scam Victims{' '}
            <span className="text-primary">Recover</span>{' '}
            What They Lost
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl"
          >
            Professional fraud investigation and digital asset recovery. 
            Report your case confidentially and let our forensic specialists trace, 
            investigate, and recover your losses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/report">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 px-8 text-base glow-cobalt-strong">
                <FileText className="w-5 h-5" />
                Report a Scam
              </Button>
            </Link>
            <Link to="/track-case">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 h-12 px-8 text-base border-border/50 hover:bg-muted/50">
                <Search className="w-5 h-5" />
                Track Your Case
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-lg"
          >
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold font-mono">1,248</span>
              </div>
              <p className="text-xs text-muted-foreground">Active Cases</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-2xl font-bold font-mono">$2.4M</span>
              </div>
              <p className="text-xs text-muted-foreground">Recovered</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold font-mono">94%</span>
              </div>
              <p className="text-xs text-muted-foreground">Resolution Rate</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}