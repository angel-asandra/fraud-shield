/**
 * @typedef {{
 *   currency: string,
 *   evidence_files: string[],
 *   full_name?: string,
 *   email?: string,
 *   phone?: string,
 *   scam_type?: string,
 *   description?: string,
 *   amount_lost?: number,
 *   date_of_incident?: string,
 *   suspect_info?: string,
 * }} CaseFormData
 */

import { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Send, CheckCircle, Lock, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import StepIndicator from '../components/report/StepIndicator';
import PersonalInfoStep from '../components/report/PersonalInfoStep';
import ScamDetailsStep from '../components/report/ScamDetailsStep';
import EvidenceStep from '../components/report/EvidenceStep';
import ReviewStep from '../components/report/ReviewStep';

function generateCaseId() {
  const year = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 90000);
  return `FR-${year}-${num}`;
}

export default function ReportScam() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [formData, setFormData] = useState(/** @type {CaseFormData} */({
    currency: 'USD',
    evidence_files: [],
  }));

  const validateStep = () => {
    if (step === 0) {
      if (!formData.full_name || !formData.email) {
        toast.error('Please fill in your name and email address.');
        return false;
      }
    }
    if (step === 1) {
      if (!formData.scam_type || !formData.description || !formData.amount_lost) {
        toast.error('Please fill in scam type, amount lost, and description.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const newCaseId = generateCaseId();
      const priority =
        formData.amount_lost ?? 0 >= 50000 ? 'high' :
          formData.amount_lost ?? 0 >= 10000 ? 'medium' : 'low';

      const sanitized = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v === '' ? null : v])
      );

      console.log('Inserting:', sanitized); // ← check this in browser console

      const { error: caseError } = await supabase
        .from('cases')
        .insert({
          ...formData,
          case_id: newCaseId,
          status: 'submitted',
          priority,
        });

      if (caseError) throw caseError;

      const { error: updateError } = await supabase
        .from('case_updates')
        .insert({
          case_id: newCaseId,
          title: 'Case Submitted',
          description: 'Your fraud report has been received and is pending initial review by our investigation team.',
          status_change: 'submitted',
          update_type: 'status_change',
        });

      if (updateError) throw updateError;

      const EMAIL_API = import.meta.env.VITE_EMAIL_API_URL ?? '';
      // Send confirmation email — non-blocking, don't throw on failure
      try {
        await fetch(`${EMAIL_API}/API/SEND-CONFIRMATION`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: formData.email,
            full_name: formData.full_name,
            case_id: newCaseId,
            scam_type: formData.scam_type,
            amount_lost: formData.amount_lost,
            currency: formData.currency,
          }),
        });
      } catch (emailErr) {
        console.warn('Email failed to send:', emailErr);
        // Don't block submission if email fails
      }

      setCaseId(newCaseId);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyCaseId = () => {
    navigator.clipboard.writeText(caseId);
    toast.success('Case ID copied to clipboard');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Report Submitted Successfully</h2>
          <p className="text-muted-foreground mb-6">Your case has been registered and assigned to our investigation queue.</p>

          <div className="p-4 rounded-xl bg-card filament-border mb-6">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Your Case ID</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-bold font-mono text-primary">{caseId}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyCaseId}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Save this ID to track your case progress</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-8">
            <Lock className="w-3.5 h-3.5" />
            <span>A confirmation has been sent to {formData.email}</span>
          </div>

          <Button
            className="bg-primary text-primary-foreground glow-cobalt"
            onClick={() => window.location.href = '/track-case'}
          >
            Track Your Case
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Secure Report Portal</span>
          <h1 className="text-3xl font-bold tracking-tight mb-2">File a Fraud Report</h1>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>End-to-end encrypted submission</span>
          </div>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-card rounded-xl filament-border p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <PersonalInfoStep data={formData} onChange={setFormData} />}
              {step === 1 && <ScamDetailsStep data={formData} onChange={setFormData} />}
              {step === 2 && <EvidenceStep data={formData} onChange={setFormData} />}
              {step === 3 && <ReviewStep data={formData} />}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            <Button
              variant="ghost"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {step < 3 ? (
              <Button onClick={handleNext} className="gap-2 bg-primary text-primary-foreground">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="gap-2 bg-primary text-primary-foreground glow-cobalt"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}