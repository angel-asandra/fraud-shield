// import React from 'react';
// import { base44 } from '@/api/base44Client';
// import { useQuery } from '@tanstack/react-query';
// import { Badge } from '@/components/ui/badge';
// import { Clock, Search, AlertTriangle, RefreshCw, CheckCircle, Shield, ArrowLeft, File } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import SecureChat from '../components/case/SecureChat';

// const statusConfig = {
//   submitted: { label: 'Submitted', color: 'bg-muted text-muted-foreground', icon: Clock },
//   under_review: { label: 'Under Review', color: 'bg-primary/10 text-primary border-primary/20', icon: Search },
//   investigating: { label: 'Investigating', color: 'bg-warning/10 text-warning border-warning/20', icon: AlertTriangle },
//   recovery_in_progress: { label: 'Recovery in Progress', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: RefreshCw },
//   resolved: { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
//   closed: { label: 'Closed', color: 'bg-muted text-muted-foreground', icon: Shield },
// };

// export default function CaseDetail() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const caseIdFromUrl = window.location.pathname.split('/case/')[1];

//   const { data: cases = [], isLoading } = useQuery({
//     queryKey: ['case-detail', caseIdFromUrl],
//     queryFn: () => base44.entities.Case.filter({ id: caseIdFromUrl }),
//     enabled: !!caseIdFromUrl,
//   });

//   const caseData = cases[0];

//   const { data: updates = [] } = useQuery({
//     queryKey: ['case-updates', caseData?.case_id],
//     queryFn: () => base44.entities.CaseUpdate.filter({ case_id: caseData.case_id }, '-created_date'),
//     enabled: !!caseData?.case_id,
//   });

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!caseData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="text-center">
//           <AlertTriangle className="w-10 h-10 text-warning mx-auto mb-4" />
//           <h2 className="text-xl font-bold mb-2">Case Not Found</h2>
//           <Link to="/track-case">
//             <Button variant="outline" className="gap-2 mt-4">
//               <ArrowLeft className="w-4 h-4" /> Back to Case Tracker
//             </Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const status = statusConfig[caseData.status] || statusConfig.submitted;
//   const StatusIcon = status.icon;

//   return (
//     <div className="min-h-screen py-20 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-8">
//           <Link to="/track-case">
//             <Button variant="ghost" size="icon" className="h-9 w-9">
//               <ArrowLeft className="w-4 h-4" />
//             </Button>
//           </Link>
//           <div className="flex-1">
//             <div className="flex items-center gap-3 flex-wrap">
//               <h1 className="text-2xl font-bold font-mono text-primary">{caseData.case_id}</h1>
//               <Badge className={`${status.color} border gap-1.5`}>
//                 <StatusIcon className="w-3 h-3" />
//                 {status.label}
//               </Badge>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//           {/* Left: Info + Timeline */}
//           <div className="lg:col-span-3 space-y-6">
//             {/* Case Info */}
//             <div className="bg-card rounded-xl filament-border p-6">
//               <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Case Summary</h3>
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground">Scam Type</p>
//                   <p className="text-sm font-medium capitalize">{caseData.scam_type?.replace(/_/g, ' ')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Amount Lost</p>
//                   <p className="text-sm font-medium font-mono">${caseData.amount_lost?.toLocaleString()} {caseData.currency}</p>
//                 </div>
//                 {caseData.recovery_amount > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground">Recovered</p>
//                     <p className="text-sm font-medium font-mono text-emerald-500">${caseData.recovery_amount?.toLocaleString()}</p>
//                   </div>
//                 )}
//                 {caseData.assigned_investigator && (
//                   <div>
//                     <p className="text-xs text-muted-foreground">Lead Investigator</p>
//                     <p className="text-sm font-medium">{caseData.assigned_investigator}</p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-xs text-muted-foreground">Date Filed</p>
//                   <p className="text-sm font-medium font-mono">{new Date(caseData.created_date).toLocaleDateString()}</p>
//                 </div>
//                 {caseData.date_of_incident && (
//                   <div>
//                     <p className="text-xs text-muted-foreground">Incident Date</p>
//                     <p className="text-sm font-medium font-mono">{caseData.date_of_incident}</p>
//                   </div>
//                 )}
//               </div>
//               <p className="text-sm text-muted-foreground leading-relaxed">{caseData.description}</p>

//               {caseData.evidence_files?.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-border/50">
//                   <p className="text-xs text-muted-foreground mb-2">Evidence ({caseData.evidence_files.length} files)</p>
//                   <div className="flex flex-wrap gap-2">
//                     {caseData.evidence_files.map((url, i) => (
//                       <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/30 text-xs font-mono hover:bg-muted/50 transition-colors">
//                         <File className="w-3 h-3 text-primary" />
//                         File {i + 1}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Timeline */}
//             <div className="bg-card rounded-xl filament-border p-6">
//               <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Investigation Timeline</h3>
//               <div className="relative">
//                 <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
//                 <div className="space-y-6">
//                   {updates.map((update, index) => (
//                     <div key={update.id} className="relative flex gap-4 pl-2">
//                       <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center z-10 ${
//                         index === 0 ? 'bg-primary glow-cobalt' : 'bg-muted border border-border'
//                       }`}>
//                         <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-semibold">{update.title}</p>
//                         <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{update.description}</p>
//                         <p className="text-xs text-muted-foreground/60 font-mono mt-2">{new Date(update.created_date).toLocaleString()}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Chat */}
//           <div className="lg:col-span-2">
//             <div className="lg:sticky lg:top-24">
//               <SecureChat caseId={caseData.case_id} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';
import { supabase } from '@/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Clock, Search, AlertTriangle, RefreshCw, CheckCircle, Shield, ArrowLeft, File } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SecureChat from '../components/case/SecureChat';

/** @type {Record<string, { label: string, color: string, icon: React.ElementType }>} */
const statusConfig = {
  submitted:            { label: 'Submitted',             color: 'bg-muted text-muted-foreground',                           icon: Clock },
  under_review:         { label: 'Under Review',          color: 'bg-primary/10 text-primary border-primary/20',             icon: Search },
  investigating:        { label: 'Investigating',         color: 'bg-warning/10 text-warning border-warning/20',             icon: AlertTriangle },
  recovery_in_progress: { label: 'Recovery in Progress',  color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: RefreshCw },
  resolved:             { label: 'Resolved',              color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
  closed:               { label: 'Closed',                color: 'bg-muted text-muted-foreground',                           icon: Shield },
};

export default function CaseDetail() {
  const { id } = useParams();

  const { data: caseData, isLoading } = useQuery({
    queryKey: ['case-detail', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: updates = [] } = useQuery({
    queryKey: ['case-updates', caseData?.case_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_updates')
        .select('*')
        .eq('case_id', caseData.case_id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!caseData?.case_id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertTriangle className="w-10 h-10 text-warning mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Case Not Found</h2>
          <Link to="/track-case">
            <Button variant="outline" className="gap-2 mt-4">
              <ArrowLeft className="w-4 h-4" /> Back to Case Tracker
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[caseData.status] || statusConfig.submitted;
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/track-case">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold font-mono text-primary">{caseData.case_id}</h1>
              <Badge className={`${status.color} border gap-1.5`}>
                <StatusIcon className="w-3 h-3" />
                {status.label}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-xl filament-border p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Case Summary</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Scam Type</p>
                  <p className="text-sm font-medium capitalize">{caseData.scam_type?.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount Lost</p>
                  <p className="text-sm font-medium font-mono">${caseData.amount_lost?.toLocaleString()} {caseData.currency}</p>
                </div>
                {caseData.recovery_amount > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Recovered</p>
                    <p className="text-sm font-medium font-mono text-emerald-500">${caseData.recovery_amount?.toLocaleString()}</p>
                  </div>
                )}
                {caseData.assigned_investigator && (
                  <div>
                    <p className="text-xs text-muted-foreground">Lead Investigator</p>
                    <p className="text-sm font-medium">{caseData.assigned_investigator}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Date Filed</p>
                  <p className="text-sm font-medium font-mono">{new Date(caseData.created_at).toLocaleDateString()}</p>
                </div>
                {caseData.date_of_incident && (
                  <div>
                    <p className="text-xs text-muted-foreground">Incident Date</p>
                    <p className="text-sm font-medium font-mono">{caseData.date_of_incident}</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{caseData.description}</p>

              {caseData.evidence_files?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Evidence ({caseData.evidence_files.length} files)</p>
                  <div className="flex flex-wrap gap-2">
                    {caseData.evidence_files.map((/** @type {string} */ url, /** @type {number} */ i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted/30 text-xs font-mono hover:bg-muted/50 transition-colors">
                        <File className="w-3 h-3 text-primary" />
                        File {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-card rounded-xl filament-border p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">Investigation Timeline</h3>
              <div className="relative">
                <div className="absolute left-3.75 top-2 bottom-2 w-px bg-border" />
                <div className="space-y-6">
                  {updates.map((update, index) => (
                    <div key={update.id} className="relative flex gap-4 pl-2">
                      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center z-10 ${
                        index === 0 ? 'bg-primary glow-cobalt' : 'bg-muted border border-border'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{update.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{update.description}</p>
                        <p className="text-xs text-muted-foreground/60 font-mono mt-2">{new Date(update.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <SecureChat caseId={caseData.case_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}