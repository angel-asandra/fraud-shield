/**
 * @typedef {{
 *   id: string,
 *   case_id: string,
 *   status: string,
 *   scam_type: string,
 *   amount_lost: number,
 *   currency: string,
 *   recovery_amount?: number,
 *   assigned_investigator?: string,
 *   created_at: string,
 * }} Case
 *
 * @typedef {{
 *   id: string,
 *   case_id: string,
 *   title: string,
 *   description: string,
 *   created_at: string,
 * }} CaseUpdate
 */

// import React, { useState } from 'react';
// import { base44 } from '@/api/base44Client';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Search, Lock, ArrowRight, Shield, Clock, AlertTriangle, CheckCircle, Loader2, RefreshCw, Banknote } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const statusConfig = {
//   submitted: { label: 'Submitted', color: 'bg-muted text-muted-foreground', icon: Clock },
//   under_review: { label: 'Under Review', color: 'bg-primary/10 text-primary border-primary/20', icon: Search },
//   investigating: { label: 'Investigating', color: 'bg-warning/10 text-warning border-warning/20', icon: AlertTriangle },
//   recovery_in_progress: { label: 'Recovery in Progress', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: RefreshCw },
//   resolved: { label: 'Resolved', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
//   closed: { label: 'Closed', color: 'bg-muted text-muted-foreground', icon: Shield },
// };

// export default function TrackCase() {
//   const [caseIdInput, setCaseIdInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [foundCase, setFoundCase] = useState(null);
//   const [updates, setUpdates] = useState([]);
//   const [notFound, setNotFound] = useState(false);

//   const handleSearch = async () => {
//     if (!caseIdInput.trim()) return;
//     setLoading(true);
//     setNotFound(false);
//     setFoundCase(null);

//     const cases = await base44.entities.Case.filter({ case_id: caseIdInput.trim().toUpperCase() });
//     if (cases.length > 0) {
//       setFoundCase(cases[0]);
//       const caseUpdates = await base44.entities.CaseUpdate.filter({ case_id: cases[0].case_id }, '-created_date');
//       setUpdates(caseUpdates);
//     } else {
//       setNotFound(true);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen py-20 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Case Intelligence</span>
//           <h1 className="text-3xl font-bold tracking-tight mb-2">Track Your Case</h1>
//           <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
//             <Lock className="w-3.5 h-3.5 text-primary" />
//             <span>Secure case lookup</span>
//           </div>
//         </div>

//         {/* Search Box */}
//         <div className="bg-card rounded-xl filament-border p-6 sm:p-8 mb-6">
//           <div className="flex gap-3">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Enter your Case ID (e.g. FR-2026-12345)"
//                 value={caseIdInput}
//                 onChange={(e) => setCaseIdInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 className="pl-10 bg-muted/30 border-border/50 h-12 font-mono"
//               />
//             </div>
//             <Button
//               onClick={handleSearch}
//               disabled={loading}
//               className="h-12 px-6 bg-primary text-primary-foreground gap-2 glow-cobalt"
//             >
//               {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
//             </Button>
//           </div>
//         </div>

//         {/* Not Found */}
//         {notFound && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-card rounded-xl filament-border p-8 text-center"
//           >
//             <AlertTriangle className="w-10 h-10 text-warning mx-auto mb-4" />
//             <h3 className="text-lg font-semibold mb-2">Case Not Found</h3>
//             <p className="text-sm text-muted-foreground mb-6">No case matches this ID. Please double-check your Case ID and try again.</p>
//             <Link to="/report">
//               <Button variant="outline" className="gap-2">
//                 File a New Report <ArrowRight className="w-4 h-4" />
//               </Button>
//             </Link>
//           </motion.div>
//         )}

//         {/* Case Found */}
//         {foundCase && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="space-y-4"
//           >
//             {/* Case Summary */}
//             <div className="bg-card rounded-xl filament-border p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Case</p>
//                   <p className="text-xl font-bold font-mono text-primary">{foundCase.case_id}</p>
//                 </div>
//                 {(() => {
//                   const status = statusConfig[foundCase.status] || statusConfig.submitted;
//                   const StatusIcon = status.icon;
//                   return (
//                     <Badge className={`${status.color} border gap-1.5`}>
//                       <StatusIcon className="w-3 h-3" />
//                       {status.label}
//                     </Badge>
//                   );
//                 })()}
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 <div>
//                   <p className="text-xs text-muted-foreground">Scam Type</p>
//                   <p className="text-sm font-medium capitalize">{foundCase.scam_type?.replace(/_/g, ' ')}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Amount Lost</p>
//                   <p className="text-sm font-medium font-mono">${foundCase.amount_lost?.toLocaleString()} {foundCase.currency}</p>
//                 </div>
//                 {foundCase.recovery_amount > 0 && (
//                   <div>
//                     <p className="text-xs text-muted-foreground">Recovered</p>
//                     <p className="text-sm font-medium font-mono text-emerald-500">${foundCase.recovery_amount?.toLocaleString()}</p>
//                   </div>
//                 )}
//                 {foundCase.assigned_investigator && (
//                   <div>
//                     <p className="text-xs text-muted-foreground">Investigator</p>
//                     <p className="text-sm font-medium">{foundCase.assigned_investigator}</p>
//                   </div>
//                 )}
//                 <div>
//                   <p className="text-xs text-muted-foreground">Filed</p>
//                   <p className="text-sm font-medium font-mono">{new Date(foundCase.created_date).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Timeline */}
//             <div className="bg-card rounded-xl filament-border p-6">
//               <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Case Timeline</h3>
//               <div className="relative">
//                 {/* Vertical Line */}
//                 <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

//                 <div className="space-y-6">
//                   {updates.map((update, index) => (
//                     <div key={update.id} className="relative flex gap-4 pl-2">
//                       <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center z-10 ${
//                         index === 0 ? 'bg-primary glow-cobalt' : 'bg-muted border border-border'
//                       }`}>
//                         <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary-foreground' : 'bg-muted-foreground'}`} />
//                       </div>
//                       <div className="pb-1">
//                         <p className="text-sm font-semibold">{update.title}</p>
//                         <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{update.description}</p>
//                         <p className="text-xs text-muted-foreground/60 font-mono mt-2">
//                           {new Date(update.created_date).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Communication Link */}
//             <div className="bg-card rounded-xl filament-border p-6">
//               <Link to={`/case/${foundCase.id}`}>
//                 <Button className="w-full bg-primary text-primary-foreground gap-2 glow-cobalt h-11">
//                   <Banknote className="w-4 h-4" />
//                   View Full Case & Communicate with Investigator
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Lock, ArrowRight, Shield, Clock, AlertTriangle, CheckCircle, Loader2, RefreshCw, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


/** @type {Record<string, { label: string, color: string, icon: React.ElementType }>} */
const statusConfig = {
  submitted:            { label: 'Submitted',             color: 'bg-muted text-muted-foreground',                        icon: Clock },
  under_review:         { label: 'Under Review',          color: 'bg-primary/10 text-primary border-primary/20',          icon: Search },
  investigating:        { label: 'Investigating',         color: 'bg-warning/10 text-warning border-warning/20',          icon: AlertTriangle },
  recovery_in_progress: { label: 'Recovery in Progress',  color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: RefreshCw },
  resolved:             { label: 'Resolved',              color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle },
  closed:               { label: 'Closed',                color: 'bg-muted text-muted-foreground',                        icon: Shield },
};

export default function TrackCase() {
  const [caseIdInput, setCaseIdInput] = useState('');
  const [loading, setLoading]         = useState(false);
  // const [foundCase, setFoundCase]     = useState(null);
  // const [updates, setUpdates]         = useState([]);
  const [foundCase, setFoundCase] = useState(/** @type {Case | null} */ (null));
const [updates, setUpdates]     = useState(/** @type {CaseUpdate[]} */ ([]));
  const [notFound, setNotFound]       = useState(false);

  const handleSearch = async () => {
    if (!caseIdInput.trim()) return;
    setLoading(true);
    setNotFound(false);
    setFoundCase(null);

    const { data: cases, error } = await supabase
      .from('cases')
      .select('*')
      .eq('case_id', caseIdInput.trim().toUpperCase())
      .limit(1);

    if (error || !cases?.length) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const found = cases[0];
    setFoundCase(found);

    const { data: caseUpdates } = await supabase
      .from('case_updates')
      .select('*')
      .eq('case_id', found.case_id)
      .order('created_at', { ascending: false });

    setUpdates(caseUpdates ?? []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Case Intelligence</span>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Track Your Case</h1>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>Secure case lookup</span>
          </div>
        </div>

        <div className="bg-card rounded-xl filament-border p-6 sm:p-8 mb-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter your Case ID (e.g. FR-2026-12345)"
                value={caseIdInput}
                onChange={(e) => setCaseIdInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-muted/30 border-border/50 h-12 font-mono"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading}
              className="h-12 px-6 bg-primary text-primary-foreground gap-2 glow-cobalt"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {notFound && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl filament-border p-8 text-center"
          >
            <AlertTriangle className="w-10 h-10 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Case Not Found</h3>
            <p className="text-sm text-muted-foreground mb-6">No case matches this ID. Please double-check and try again.</p>
            <Link to="/report">
              <Button variant="outline" className="gap-2">
                File a New Report <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}

        {foundCase && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-card rounded-xl filament-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Case</p>
                  <p className="text-xl font-bold font-mono text-primary">{foundCase.case_id}</p>
                </div>
                {(() => {
                  const status = statusConfig[foundCase.status] || statusConfig.submitted;
                  const StatusIcon = status.icon;
                  return (
                    <Badge className={`${status.color} border gap-1.5`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  );
                })()}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Scam Type</p>
                  <p className="text-sm font-medium capitalize">{foundCase.scam_type?.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount Lost</p>
                  <p className="text-sm font-medium font-mono">${foundCase.amount_lost?.toLocaleString()} {foundCase.currency}</p>
                </div>
                {
// @ts-ignore
                foundCase.recovery_amount > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Recovered</p>
                    <p className="text-sm font-medium font-mono text-emerald-500">${foundCase.recovery_amount?.toLocaleString()}</p>
                  </div>
                )}
                {foundCase.assigned_investigator && (
                  <div>
                    <p className="text-xs text-muted-foreground">Investigator</p>
                    <p className="text-sm font-medium">{foundCase.assigned_investigator}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground">Filed</p>
                  <p className="text-sm font-medium font-mono">{new Date(foundCase.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl filament-border p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Case Timeline</h3>
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
                      <div className="pb-1">
                        <p className="text-sm font-semibold">{update.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{update.description}</p>
                        <p className="text-xs text-muted-foreground/60 font-mono mt-2">
                          {new Date(update.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl filament-border p-6">
              <Link to={`/case/${foundCase.id}`}>
                <Button className="w-full bg-primary text-primary-foreground gap-2 glow-cobalt h-11">
                  <Banknote className="w-4 h-4" />
                  View Full Case & Communicate with Investigator
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}