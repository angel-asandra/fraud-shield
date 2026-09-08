import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, AlertTriangle, DollarSign, Calendar, File, Info } from 'lucide-react';


/** @type {Record<string, string>} */
const scamTypeLabels = {
  investment: 'Investment Fraud',
  romance: 'Romance Scam',
  crypto: 'Cryptocurrency Scam',
  phishing: 'Phishing',
  identity_theft: 'Identity Theft',
  employment: 'Employment Scam',
  tech_support: 'Tech Support Scam',
  online_shopping: 'Online Shopping Fraud',
  lottery: 'Lottery / Prize Scam',
  other: 'Other',
};

/**
 * @param {{ data: any }} props
 */
export default function ReviewStep({ data }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Review Your Report</h3>
        <p className="text-sm text-muted-foreground">Please review all information before submitting. You can go back to make changes.</p>
      </div>

      {/* Personal Info */}
      <div className="p-5 rounded-xl bg-muted/20 filament-border space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Personal Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{data.full_name || '—'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{data.email || '—'}</span>
          </div>
          {data.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{data.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Scam Details */}
      <div className="p-5 rounded-xl bg-muted/20 filament-border space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Scam Details</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {scamTypeLabels[data.scam_type] || data.scam_type}
          </Badge>
          <Badge variant="outline" className="font-mono">
            <DollarSign className="w-3 h-3 mr-1" />
            {data.amount_lost?.toLocaleString()} {data.currency || 'USD'}
          </Badge>
          {data.date_of_incident && (
            <Badge variant="outline" className="font-mono">
              <Calendar className="w-3 h-3 mr-1" />
              {data.date_of_incident}
            </Badge>
          )}
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{data.description}</p>
        {data.suspect_info && (
          <div className="mt-3 p-3 rounded-lg bg-muted/30">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Suspect Information</p>
            <p className="text-sm text-foreground/70">{data.suspect_info}</p>
          </div>
        )}
      </div>

      {/* Evidence */}
      <div className="p-5 rounded-xl bg-muted/20 filament-border space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Evidence Files</h4>
        {data.evidence_files?.length > 0 ? (
          <div className="space-y-2">
            {data.evidence_files.map((/** @type {string} */ url, /** @type {number} */ i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <File className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs truncate">{url.split('/').pop()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No evidence files uploaded</p>
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/5 border border-warning/10">
        <Info className="w-5 h-5 text-warning mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          By submitting this report, you confirm that all information provided is accurate and truthful. 
          False reports may be subject to legal consequences. Recovery outcomes cannot be guaranteed 
          and depend on the specific circumstances of each case.
        </p>
      </div>
    </div>
  );
}