import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, Award, Globe, Users, FileText, ArrowRight, Briefcase, GraduationCap, Scale } from 'lucide-react';

const ABOUT_IMAGE = 'https://media.base44.com/images/public/69f0e0980939f2580420592d/7778b4af0_generated_78326ba4.png';

const credentials = [
  { icon: Award, title: 'Certified Fraud Examiners', description: 'Our lead investigators hold CFE certification from the Association of Certified Fraud Examiners.' },
  { icon: Globe, title: 'International Network', description: 'We maintain partnerships with law enforcement agencies, financial institutions, and legal teams in over 40 countries.' },
  { icon: Scale, title: 'Legal Expertise', description: 'Our team includes former prosecutors and financial crime attorneys specializing in cross-border fraud cases.' },
  { icon: Briefcase, title: '15+ Years Experience', description: 'Combined team experience of over 15 years in digital forensics, blockchain analysis, and fraud investigation.' },
];

const team = [
  { name: 'Director of Investigations', role: 'Lead Forensic Analyst', experience: 'Former FBI Cyber Division. 12 years in digital forensics and cryptocurrency tracing.' },
  { name: 'Head of Recovery Operations', role: 'Senior Investigator', experience: 'Background in international banking compliance. Specialist in cross-border fund recovery.' },
  { name: 'Chief Legal Counsel', role: 'Legal Director', experience: 'Former financial crimes prosecutor. Expert in fraud litigation and asset freezing orders.' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_IMAGE} alt="Investigator working at keyboard in dark room with blue light reflections" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">About Sentinel</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">The Investigation Team</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a specialized unit of forensic investigators, blockchain analysts, and legal professionals 
            dedicated to recovering assets lost to fraud and cybercrime.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Credentials & Expertise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Our credibility is built on verified expertise and a proven track record.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((cred, index) => (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-xl filament-border bg-card/50 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                  <cred.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">{cred.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cred.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Investigation Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              For security purposes, team members are identified by their role rather than personal identity.
            </p>
          </div>

          <div className="space-y-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-xl filament-border bg-card/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{member.name}</h3>
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">{member.role}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{member.experience}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '2,400+', label: 'Cases Handled' },
              { value: '$12M+', label: 'Total Recovered' },
              { value: '40+', label: 'Countries' },
              { value: '94%', label: 'Resolution Rate' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-xl filament-border bg-card/50"
              >
                <p className="text-3xl font-bold font-mono text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Need Our Help?</h2>
          <p className="text-muted-foreground mb-8">Every case matters. Reach out and let us assess your situation.</p>
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