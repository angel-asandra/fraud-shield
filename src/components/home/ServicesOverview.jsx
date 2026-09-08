import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileSearch, Radar, Banknote, ShieldCheck, MessageSquareLock } from 'lucide-react';

const services = [
  {
    icon: FileSearch,
    title: 'Case Review',
    description: 'Every submitted report undergoes meticulous analysis by our forensic team to determine the viability and approach for investigation.'
  },
  {
    icon: Search,
    title: 'Evidence Analysis',
    description: 'We examine digital footprints, transaction records, communications, and metadata to build a comprehensive fraud profile.'
  },
  {
    icon: Radar,
    title: 'Scam Tracing',
    description: 'Using advanced blockchain analytics and OSINT techniques, we trace funds and identify perpetrators across jurisdictions.'
  },
  {
    icon: Banknote,
    title: 'Recovery Attempts',
    description: 'We work with financial institutions, law enforcement, and legal teams to freeze assets and initiate fund recovery procedures.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure Reporting',
    description: 'Your information is protected with enterprise-grade encryption. Every communication is confidential and legally privileged.'
  },
  {
    icon: MessageSquareLock,
    title: 'Private Communication',
    description: 'Communicate directly with your assigned investigator through our encrypted messaging channel for real-time case updates.'
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Investigation Protocol</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">How We Protect You</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multi-phase investigation process combines cutting-edge digital forensics with traditional investigative methods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group p-6 rounded-xl filament-border bg-card/50 hover:bg-card hover:glow-cobalt transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}