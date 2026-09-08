import React, { useState, useRef } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X, File, Image, FileText, Loader2, ShieldCheck } from 'lucide-react';

/**
 * @param {{ data: any, onChange: Function }} props
 */
export default function EvidenceStep({ data, onChange }) {
  const [uploading, setUploading] = useState(false);
  /** @type {React.RefObject<HTMLInputElement | null>} */
  const fileInputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  /** @type {string[]} */
  const files = data.evidence_files || [];

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (!selectedFiles.length) return;

    setUploading(true);
    const uploadedUrls = [...files];

    for (const file of selectedFiles) {
      const filePath = `evidence/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

      const { error } = await supabase.storage
        .from('evidence-files')
        .upload(filePath, file, { upsert: false });

      if (error) {
        console.error('Upload error:', error.message);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('evidence-files')
        .getPublicUrl(filePath);

      uploadedUrls.push(urlData.publicUrl);
    }

    onChange({ ...data, evidence_files: uploadedUrls });
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * @param {number} index
   */
  const removeFile = (index) => {
    const updated = files.filter((/** @type {string} */ _, i) => i !== index);
    onChange({ ...data, evidence_files: updated });
  };

  /**
   * @param {string} url
   */
  const getFileIcon = (url) => {
    if (/\.(jpg|jpeg|png|gif|webp)/i.test(url)) return Image;
    if (/\.(pdf)/i.test(url)) return FileText;
    return File;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Upload Evidence</h3>
        <p className="text-sm text-muted-foreground">
          Upload screenshots, emails, transaction receipts, or any other evidence. Files are encrypted and stored securely.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-border/50 rounded-xl p-10 text-center cursor-pointer hover:border-primary/30 hover:bg-primary/2 transition-all duration-300 group"
      >
        {uploading && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="h-full w-1/3 scan-line animate-scan" />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
          onChange={handleUpload}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm font-medium text-primary">Encrypting & Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-all">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">Images, PDFs, documents up to 25MB each</p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Uploaded Evidence ({files.length})</Label>
          <div className="space-y-2">
            {files.map((/** @type {string} */ url, /** @type {number} */ index) => {
              const FileIcon = getFileIcon(url);
              const fileName = url.split('/').pop() || `Evidence ${index + 1}`;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 filament-border">
                  <div className="flex items-center gap-3">
                    <FileIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono truncate max-w-50 sm:max-w-87.5">{fileName}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 filament-border">
        <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium">Secure Evidence Vault</p>
          <p className="text-xs text-muted-foreground mt-1">
            All uploaded files are encrypted with AES-256 encryption and stored in our secure evidence vault.
            Access is restricted to your assigned investigator only.
          </p>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useRef } from 'react';
// import { base44 } from '@/api/base44Client';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import { Upload, X, File, Image, FileText, Loader2, ShieldCheck } from 'lucide-react';

// /**
//  * @param {{ data: any, onChange?: Function }} props
//  */
// export default function EvidenceStep({ data, onChange }) {
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const files = data.evidence_files || [];

//   const handleUpload = async (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (!selectedFiles.length) return;

//     setUploading(true);
//     const uploadedUrls = [...files];

//     for (const file of selectedFiles) {
//       const { file_url } = await base44.integrations.Core.UploadFile({ file });
//       uploadedUrls.push(file_url);
//     }

//     onChange({ ...data, evidence_files: uploadedUrls });
//     setUploading(false);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const removeFile = (index) => {
//     const updated = files.filter((_, i) => i !== index);
//     onChange({ ...data, evidence_files: updated });
//   };

//   const getFileIcon = (url) => {
//     if (/\.(jpg|jpeg|png|gif|webp)/i.test(url)) return Image;
//     if (/\.(pdf)/i.test(url)) return FileText;
//     return File;
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-semibold mb-1">Upload Evidence</h3>
//         <p className="text-sm text-muted-foreground">
//           Upload screenshots, emails, transaction receipts, or any other evidence. Files are encrypted and stored securely.
//         </p>
//       </div>

//       {/* Upload Zone */}
//       <div
//         onClick={() => !uploading && fileInputRef.current?.click()}
//         className="relative border-2 border-dashed border-border/50 rounded-xl p-10 text-center cursor-pointer hover:border-primary/30 hover:bg-primary/2 transition-all duration-300 group"
//       >
//         {uploading && (
//           <div className="absolute inset-0 rounded-xl overflow-hidden">
//             <div className="h-full w-1/3 scan-line animate-scan" />
//           </div>
//         )}

//         <input
//           ref={fileInputRef}
//           type="file"
//           multiple
//           accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
//           onChange={handleUpload}
//           className="hidden"
//         />

//         {uploading ? (
//           <div className="flex flex-col items-center gap-3">
//             <Loader2 className="w-8 h-8 text-primary animate-spin" />
//             <p className="text-sm font-medium text-primary">Encrypting & Uploading...</p>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center gap-3">
//             <div className="w-14 h-14 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-all">
//               <Upload className="w-6 h-6 text-primary" />
//             </div>
//             <div>
//               <p className="text-sm font-medium">Drop files here or click to upload</p>
//               <p className="text-xs text-muted-foreground mt-1">Images, PDFs, documents up to 25MB each</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Uploaded Files */}
//       {files.length > 0 && (
//         <div className="space-y-2">
//           <Label className="text-sm font-medium">Uploaded Evidence ({files.length})</Label>
//           <div className="space-y-2">
//             {files.map((url, index) => {
//               const FileIcon = getFileIcon(url);
//               const fileName = url.split('/').pop() || `Evidence ${index + 1}`;
//               return (
//                 <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 filament-border">
//                   <div className="flex items-center gap-3">
//                     <FileIcon className="w-4 h-4 text-primary" />
//                     <span className="text-sm font-mono truncate max-w-[200px] sm:max-w-[350px]">{fileName}</span>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="h-8 w-8 text-muted-foreground hover:text-destructive"
//                     onClick={() => removeFile(index)}
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Security Notice */}
//       <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 filament-border">
//         <ShieldCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
//         <div>
//           <p className="text-sm font-medium">Secure Evidence Vault</p>
//           <p className="text-xs text-muted-foreground mt-1">All uploaded files are encrypted with AES-256 encryption and stored in our secure evidence vault. Access is restricted to your assigned investigator only.</p>
//         </div>
//       </div>
//     </div>
//   );
// }