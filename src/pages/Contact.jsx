import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Lock, CheckCircle, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);
    // Simulate send
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
    toast.success('Message sent successfully.');
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Reach out for a confidential consultation about your case.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-xl filament-border bg-card/50">
              <h3 className="text-sm font-semibold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <a href="mailto:info@sentinel-recovery.com" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">info@sentinel-recovery.com</p>
                    <p className="text-xs text-muted-foreground">General Inquiries</p>
                  </div>
                </a>
                <a href="tel:+18005551234" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">+1 (800) 555-1234</p>
                    <p className="text-xs text-muted-foreground">Mon–Fri, 9AM–6PM EST</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Secure Operations Center</p>
                    <p className="text-xs text-muted-foreground">Location Confidential</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl filament-border bg-card/50">
              <h3 className="text-sm font-semibold mb-3">Response Time</h3>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Within 24 Hours</p>
                  <p className="text-xs text-muted-foreground">Critical cases prioritized for immediate response</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 filament-border flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                All communications are encrypted and handled with strict confidentiality. 
                Your information will never be shared without your explicit consent.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl filament-border p-6 sm:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent</h3>
                  <p className="text-sm text-muted-foreground">We'll respond within 24 hours. Check your email for confirmation.</p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Your Name *</Label>
                      <Input
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="bg-muted/30 border-border/50 h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="bg-muted/30 border-border/50 h-11"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Subject</Label>
                    <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                      <SelectTrigger className="bg-muted/30 border-border/50 h-11">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new_case">New Case Inquiry</SelectItem>
                        <SelectItem value="existing_case">Existing Case Question</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="partnership">Partnership / Legal</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Message *</Label>
                    <Textarea
                      placeholder="Describe your situation or question..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-muted/30 border-border/50 min-h-[160px] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span>Encrypted submission</span>
                    </div>
                    <Button
                      type="submit"
                      disabled={sending}
                      className="bg-primary text-primary-foreground gap-2 glow-cobalt"
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}