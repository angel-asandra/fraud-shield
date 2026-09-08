import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Calendar } from 'lucide-react';

const scamTypes = [
  { value: 'investment', label: 'Investment Fraud' },
  { value: 'romance', label: 'Romance Scam' },
  { value: 'crypto', label: 'Cryptocurrency Scam' },
  { value: 'phishing', label: 'Phishing' },
  { value: 'identity_theft', label: 'Identity Theft' },
  { value: 'employment', label: 'Employment Scam' },
  { value: 'tech_support', label: 'Tech Support Scam' },
  { value: 'online_shopping', label: 'Online Shopping Fraud' },
  { value: 'lottery', label: 'Lottery / Prize Scam' },
  { value: 'other', label: 'Other' },
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'BTC', 'ETH', 'OTHER'];

/**
 * @param {{ data: any, onChange: (data: any) => void }} props
 */
export default function ScamDetailsStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Scam Details</h3>
        <p className="text-sm text-muted-foreground">Provide as much detail as possible to help our investigators.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Type of Scam *</Label>
          <Select
            value={data.scam_type || ''}
            onValueChange={(value) => onChange({ ...data, scam_type: value })}
          >
            <SelectTrigger className="bg-muted/30 border-border/50 h-11">
              <SelectValue placeholder="Select scam type" />
            </SelectTrigger>
            <SelectContent>
              {scamTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Amount Lost *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="0.00"
                value={data.amount_lost || ''}
                onChange={(e) => onChange({ ...data, amount_lost: parseFloat(e.target.value) || '' })}
                className="pl-10 bg-muted/30 border-border/50 h-11"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Currency</Label>
            <Select
              value={data.currency || 'USD'}
              onValueChange={(value) => onChange({ ...data, currency: value })}
            >
              <SelectTrigger className="bg-muted/30 border-border/50 h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Date of Incident</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="date"
              value={data.date_of_incident || null}
              onChange={(e) => onChange({ ...data, date_of_incident: e.target.value })}
              className="pl-10 bg-muted/30 border-border/50 h-11"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Description of Incident *</Label>
          <Textarea
            placeholder="Describe what happened in as much detail as possible. Include names, websites, transaction IDs, or any other relevant information."
            value={data.description || ''}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="bg-muted/30 border-border/50 min-h-35 resize-none"
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Suspect Information (Optional)</Label>
          <Textarea
            placeholder="Any known details about the scammer: names, email addresses, phone numbers, websites, social media profiles, wallet addresses..."
            value={data.suspect_info || ''}
            onChange={(e) => onChange({ ...data, suspect_info: e.target.value })}
            className="bg-muted/30 border-border/50 min-h-25 resize-none"
          />
        </div>
      </div>
    </div>
  );
}