import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, FileSearch, Search, Radar, Scale, Banknote, ShieldAlert, Info } from 'lucide-react';

const SERVICES_IMAGE = 'https://media.base44.com/images/public/69f0e0980939f2580420592d/85917cd51_generated_330bd3b0.png';

const steps = [
  {
    icon: FileSearch,
    number: '01',
    title: 'Case Intake & Review',
    description: 'Our forensic analysts review your submitted evidence, verify the claim, and assess the viability of recovery. We categorize the type of fraud and determine the optimal investigation strategy.',
    duration: '24–48 hours',
  },
  {
    icon: Search,
    number: '02',
    title: 'Evidence Analysis',
    description: 'We perform deep analysis on all provided materials — transaction records, communication logs, blockchain data, and digital artifacts. Our team uses OSINT and proprietary tools to build a comprehensive fraud profile.',
    duration: '3–7 days',
  },
  {
    icon: Radar,
    number: '03',
    title: 'Scam Tracing',
    description: 'Using advanced blockchain analytics, IP tracing, and cross-referencing global fraud databases, we identify the origin and destination of stolen funds. We trace wallet addresses, bank accounts, and intermediary entities.',
    duration: '1–3 weeks',
  },
  {
    icon: Scale,
    number: '04',
    title: 'Legal Coordination',
    description: 'We prepare forensic reports admissible in court and coordinate with law enforcement agencies, financial institutions, and legal partners across jurisdictions to freeze assets and initiate legal proceedings.',
    duration: '2–6 weeks',
  },
  {
    icon: Banknote,
    number: '05',
    title: 'Recovery Execution',
    description: 'Once assets are located and frozen, we work through legal and institutional channels to initiate the return of funds. We handle all communications with banks, exchanges, and regulatory bodies on your behalf.',
    duration: 'Varies by case',
  },
];

export default function RecoveryServices() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_IMAGE} alt="Secure server room with blue and green LED lights" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Investigation Protocol</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Recovery Process</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our structured, multi-phase investigation process combines cutting-edge digital forensics 
            with legal coordination to maximize recovery outcomes.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-10"
                >
                  {/* Node */}
                  <div className="hidden md:flex shrink-0 w-16 items-start justify-center">
                    <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center glow-cobalt">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-xl filament-border p-6 hover:glow-cobalt transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-mono text-primary/60 uppercase tracking-wider">Phase {step.number}</span>
                        <h3 className="text-lg font-semibold mt-1">{step.title}</h3>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground/60 px-2.5 py-1 rounded-full bg-muted/50 whitespace-nowrap">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-warning/5 border border-warning/10 flex items-start gap-4">
            <ShieldAlert className="w-6 h-6 text-warning shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-2">Important Disclaimer</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                While our team employs the most advanced investigation techniques available, 
                <strong> recovery of lost funds is not guaranteed</strong>. Success rates depend on the type of fraud, 
                the speed of reporting, the jurisdiction involved, and the cooperation of financial institutions. 
                We maintain full transparency about realistic outcomes throughout your case.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin Recovery?</h2>
          <p className="text-muted-foreground mb-8">The sooner you report, the higher the chance of recovery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button size="lg" className="bg-primary text-primary-foreground gap-2 h-12 px-8 glow-cobalt-strong">
                <FileText className="w-5 h-5" /> File a Report
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}