import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { label: 'Personal Info' },
  { label: 'Scam Details' },
  { label: 'Evidence' },
  { label: 'Review' },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-semibold transition-all duration-300 ${
              index < currentStep
                ? 'bg-primary text-primary-foreground'
                : index === currentStep
                ? 'bg-primary/10 border-2 border-primary text-primary glow-cobalt'
                : 'bg-muted text-muted-foreground border border-border'
            }`}>
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`text-[11px] font-medium hidden sm:block ${
              index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
            }`}>{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px mx-3 transition-all duration-300 ${
              index < currentStep ? 'bg-primary' : 'bg-border'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}