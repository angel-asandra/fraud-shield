import { useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Shield } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const { user, isAuthenticated, authChecked } = useAuth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-muted-foreground/30 font-mono">404</h1>
          <div className="h-px w-16 bg-border mx-auto" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page <span className="font-mono text-primary">"{pageName}"</span> could not be located.
          </p>
        </div>
        {authChecked && isAuthenticated && user?.user_metadata?.role === 'admin' && (
          <div className="p-4 bg-muted/30 rounded-lg filament-border text-left">
            <p className="text-sm text-muted-foreground">
              Admin: This page may not have been implemented yet.
            </p>
          </div>
        )}
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow-cobalt"
        >
          <Shield className="w-4 h-4" />
          Return Home
        </button>
      </div>
    </div>
  );
}

// import { useLocation } from 'react-router-dom';
// import { base44 } from '@/api/base44Client';
// import { useQuery } from '@tanstack/react-query';
// import { Shield } from 'lucide-react';

// export default function PageNotFound() {
//     const location = useLocation();
//     const pageName = location.pathname.substring(1);

//     const { data: authData, isFetched } = useQuery({
//         queryKey: ['user'],
//         queryFn: async () => {
//             try {
//                 const user = await base44.auth.me();
//                 return { user, isAuthenticated: true };
//             } catch (error) {
//                 return { user: null, isAuthenticated: false };
//             }
//         }
//     });

//     return (
//         <div className="min-h-[80vh] flex items-center justify-center p-6">
//             <div className="max-w-md w-full text-center space-y-6">
//                 <div className="space-y-2">
//                     <h1 className="text-7xl font-light text-muted-foreground/30 font-mono">404</h1>
//                     <div className="h-px w-16 bg-border mx-auto"></div>
//                 </div>
//                 <div className="space-y-3">
//                     <h2 className="text-2xl font-semibold">Page Not Found</h2>
//                     <p className="text-muted-foreground">
//                         The page <span className="font-mono text-primary">"{pageName}"</span> could not be located.
//                     </p>
//                 </div>
//                 {isFetched && authData?.isAuthenticated && authData?.user?.role === 'admin' && (
//                     <div className="p-4 bg-muted/30 rounded-lg filament-border text-left">
//                         <p className="text-sm text-muted-foreground">
//                             Admin: This page may not have been implemented yet.
//                         </p>
//                     </div>
//                 )}
//                 <button
//                     onClick={() => window.location.href = '/'}
//                     className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors glow-cobalt"
//                 >
//                     <Shield className="w-4 h-4" />
//                     Return Home
//                 </button>
//             </div>
//         </div>
//     );
// }