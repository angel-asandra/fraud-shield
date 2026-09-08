import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Lock, Shield } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * @param {{ caseId: string }} props
 */
export default function SecureChat({ caseId }) {
  const [message, setMessage] = useState('');
 /** @type {React.RefObject<HTMLDivElement | null>} */
const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', caseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('case_id', caseId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  // Realtime subscription — fix: useEffect cleanup can't return a Promise
  useEffect(() => {
    const channel = supabase
      .channel(`messages:${caseId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `case_id=eq.${caseId}` },
        () => queryClient.invalidateQueries({ queryKey: ['messages', caseId] })
      )
      .subscribe();

    // Return a sync cleanup function, not async
    return () => {
      supabase.removeChannel(channel);
    };
  }, [caseId, queryClient]);

  const sendMutation = useMutation({
    mutationFn: /** @param {string} content */ async (content) => {
      const { error } = await supabase.from('messages').insert({
        case_id:     caseId,
        content,
        sender_role: 'client',
        sender_name: 'Client',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', caseId] });
      setMessage('');
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMutation.mutate(message.trim());
  };

  return (
    <div className="bg-card rounded-xl filament-border overflow-hidden">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Secure Terminal</h3>
          <p className="text-xs text-muted-foreground">Encrypted communication channel</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
          <span className="text-[10px] font-medium text-emerald-500">ENCRYPTED</span>
        </div>
      </div>

      <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <Shield className="w-8 h-8 text-primary/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No messages yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Send a message to your assigned investigator</p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender_role === 'client' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
              msg.sender_role === 'client'
                ? 'bg-primary text-primary-foreground'
                : msg.sender_role === 'system'
                ? 'bg-muted/50 text-muted-foreground border border-border/50'
                : 'bg-muted text-foreground'
            }`}>
              {msg.sender_role !== 'client' && (
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 opacity-60">
                  {msg.sender_role === 'system' ? 'System' : msg.sender_name || 'Investigator'}
                </p>
              )}
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className={`text-[10px] mt-1 ${
                msg.sender_role === 'client' ? 'text-primary-foreground/50' : 'text-muted-foreground/50'
              }`}>
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Type a secure message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="bg-muted/30 border-border/50 pr-10 h-11"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sendMutation.isPending}
            className="h-11 w-11 bg-primary text-primary-foreground p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// // import React, { useState, useRef, useEffect } from 'react';
// // import { base44 } from '@/api/base44Client';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { Send, Lock, Paperclip, Shield } from 'lucide-react';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// // export default function SecureChat({ caseId }) {
// //   const [message, setMessage] = useState('');
// //   const scrollRef = useRef(null);
// //   const queryClient = useQueryClient();

// //   const { data: messages = [] } = useQuery({
// //     queryKey: ['messages', caseId],
// //     queryFn: () => base44.entities.Message.filter({ case_id: caseId }, 'created_date'),
// //     refetchInterval: 10000,
// //   });

// //   const sendMutation = useMutation({
// //     mutationFn: (content) => base44.entities.Message.create({
// //       case_id: caseId,
// //       content,
// //       sender_role: 'client',
// //       sender_name: 'Client',
// //     }),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['messages', caseId] });
// //       setMessage('');
// //     },
// //   });

// //   useEffect(() => {
// //     if (scrollRef.current) {
// //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const handleSend = () => {
// //     if (!message.trim()) return;
// //     sendMutation.mutate(message.trim());
// //   };

// //   return (
// //     <div className="bg-card rounded-xl filament-border overflow-hidden">
// //       {/* Header */}
// //       <div className="p-4 border-b border-border/50 flex items-center justify-between">
// //         <div>
// //           <h3 className="text-sm font-semibold">Secure Terminal</h3>
// //           <p className="text-xs text-muted-foreground">Encrypted communication channel</p>
// //         </div>
// //         <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
// //           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
// //           <span className="text-[10px] font-medium text-emerald-500">ENCRYPTED</span>
// //         </div>
// //       </div>

// //       {/* Messages */}
// //       <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-3">
// //         {messages.length === 0 && (
// //           <div className="h-full flex items-center justify-center text-center">
// //             <div>
// //               <Shield className="w-8 h-8 text-primary/20 mx-auto mb-3" />
// //               <p className="text-sm text-muted-foreground">No messages yet</p>
// //               <p className="text-xs text-muted-foreground/60 mt-1">Send a message to your assigned investigator</p>
// //             </div>
// //           </div>
// //         )}
// //         {messages.map((msg) => (
// //           <div
// //             key={msg.id}
// //             className={`flex ${msg.sender_role === 'client' ? 'justify-end' : 'justify-start'}`}
// //           >
// //             <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
// //               msg.sender_role === 'client'
// //                 ? 'bg-primary text-primary-foreground'
// //                 : msg.sender_role === 'system'
// //                 ? 'bg-muted/50 text-muted-foreground border border-border/50'
// //                 : 'bg-muted text-foreground'
// //             }`}>
// //               {msg.sender_role !== 'client' && (
// //                 <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 opacity-60">
// //                   {msg.sender_role === 'system' ? 'System' : msg.sender_name || 'Investigator'}
// //                 </p>
// //               )}
// //               <p className="text-sm leading-relaxed">{msg.content}</p>
// //               <p className={`text-[10px] mt-1 ${
// //                 msg.sender_role === 'client' ? 'text-primary-foreground/50' : 'text-muted-foreground/50'
// //               }`}>
// //                 {new Date(msg.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Input */}
// //       <div className="p-4 border-t border-border/50">
// //         <div className="flex gap-2">
// //           <div className="relative flex-1">
// //             <Input
// //               placeholder="Type a secure message..."
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
// //               className="bg-muted/30 border-border/50 pr-10 h-11"
// //             />
// //             <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
// //           </div>
// //           <Button
// //             onClick={handleSend}
// //             disabled={!message.trim() || sendMutation.isPending}
// //             className="h-11 w-11 bg-primary text-primary-foreground p-0"
// //           >
// //             <Send className="w-4 h-4" />
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState, useRef, useEffect } from 'react';
// import { supabase } from '@/api/supabaseClient';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Send, Lock, Shield } from 'lucide-react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// export default function SecureChat({ caseId }) {
//   const [message, setMessage] = useState('');
//   const scrollRef             = useRef(null);
//   const queryClient           = useQueryClient();

//   const { data: messages = [] } = useQuery({
//     queryKey: ['messages', caseId],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('case_id', caseId)
//         .order('created_at', { ascending: true });
//       if (error) throw error;
//       return data;
//     },
//   });

//   // Realtime subscription — replaces the 10s polling interval
//   useEffect(() => {
//     const channel = supabase
//       .channel(`messages:${caseId}`)
//       .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'messages', filter: `case_id=eq.${caseId}` },
//         () => queryClient.invalidateQueries({ queryKey: ['messages', caseId] })
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, [caseId, queryClient]);

//   const sendMutation = useMutation({
//     mutationFn: async (content) => {
//       const { error } = await supabase.from('messages').insert({
//         case_id:     caseId,
//         content,
//         sender_role: 'client',
//         sender_name: 'Client',
//       });
//       if (error) throw error;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['messages', caseId] });
//       setMessage('');
//     },
//   });

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     sendMutation.mutate(message.trim());
//   };

//   return (
//     <div className="bg-card rounded-xl filament-border overflow-hidden">
//       <div className="p-4 border-b border-border/50 flex items-center justify-between">
//         <div>
//           <h3 className="text-sm font-semibold">Secure Terminal</h3>
//           <p className="text-xs text-muted-foreground">Encrypted communication channel</p>
//         </div>
//         <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
//           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-glow" />
//           <span className="text-[10px] font-medium text-emerald-500">ENCRYPTED</span>
//         </div>
//       </div>

//       <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 && (
//           <div className="h-full flex items-center justify-center text-center">
//             <div>
//               <Shield className="w-8 h-8 text-primary/20 mx-auto mb-3" />
//               <p className="text-sm text-muted-foreground">No messages yet</p>
//               <p className="text-xs text-muted-foreground/60 mt-1">Send a message to your assigned investigator</p>
//             </div>
//           </div>
//         )}
//         {messages.map((msg) => (
//           <div key={msg.id} className={`flex ${msg.sender_role === 'client' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
//               msg.sender_role === 'client'
//                 ? 'bg-primary text-primary-foreground'
//                 : msg.sender_role === 'system'
//                 ? 'bg-muted/50 text-muted-foreground border border-border/50'
//                 : 'bg-muted text-foreground'
//             }`}>
//               {msg.sender_role !== 'client' && (
//                 <p className="text-[10px] font-semibold uppercase tracking-wider mb-1 opacity-60">
//                   {msg.sender_role === 'system' ? 'System' : msg.sender_name || 'Investigator'}
//                 </p>
//               )}
//               <p className="text-sm leading-relaxed">{msg.content}</p>
//               <p className={`text-[10px] mt-1 ${
//                 msg.sender_role === 'client' ? 'text-primary-foreground/50' : 'text-muted-foreground/50'
//               }`}>
//                 {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 border-t border-border/50">
//         <div className="flex gap-2">
//           <div className="relative flex-1">
//             <Input
//               placeholder="Type a secure message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               className="bg-muted/30 border-border/50 pr-10 h-11"
//             />
//             <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
//           </div>
//           <Button
//             onClick={handleSend}
//             disabled={!message.trim() || sendMutation.isPending}
//             className="h-11 w-11 bg-primary text-primary-foreground p-0"
//           >
//             <Send className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }