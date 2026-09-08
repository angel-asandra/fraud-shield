import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone } from 'lucide-react';

/**
 * @param {{ data: any, onChange?: (data: any) => void }} props
 */
export default function PersonalInfoStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Personal Information</h3>
        <p className="text-sm text-muted-foreground">Your identity is protected with end-to-end encryption.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name" className="text-sm font-medium mb-2 block">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="full_name"
              placeholder="Enter your full name"
              value={data.full_name || ''}
              onChange={(e) => onChange?.({ ...data, full_name: e.target.value })}
              className="pl-10 bg-muted/30 border-border/50 h-11"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={data.email || ''}
              onChange={(e) => onChange?.({ ...data, email: e.target.value })}
              className="pl-10 bg-muted/30 border-border/50 h-11"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={data.phone || ''}
              onChange={(e) => onChange?.({ ...data, phone: e.target.value })}
              className="pl-10 bg-muted/30 border-border/50 h-11"
            />
          </div>
        </div>
      </div>
    </div>
  );
}