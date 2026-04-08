import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertTriangle, Loader2, Database } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import HeroHeader from '../HeroHeader';

// Helper to parse CSV text into objects
const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) throw new Error("CSV is empty or missing headers");

  const headers = lines[0].split(',').map(h => h.trim());
  
  // Group by platform ID to create nested plans
  const platformsMap = {};

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length < headers.length) continue; // Skip malformed lines

    const row = {};
    headers.forEach((header, index) => {
      // Handle numeric conversion for prices
      if (header.includes('price')) {
        row[header] = parseFloat(values[index]) || 0;
      } else {
        // Handle potentially quoted strings (basic implementation)
        row[header] = values[index].replace(/^"|"$/g, '');
      }
    });

    const { id, name, category, website, plan_name, price_monthly, price_annual, interval, features } = row;

    if (!id) continue;

    if (!platformsMap[id]) {
      platformsMap[id] = {
        id,
        name,
        category,
        website: website || '',
        plans: []
      };
    }

    // Add plan logic
    if (plan_name) {
      // Create monthly plan
      if (price_monthly > 0) {
        platformsMap[id].plans.push({
          id: `${id}_${plan_name.toLowerCase().replace(/\s+/g, '_')}_monthly`,
          name: plan_name,
          price: price_monthly,
          interval: 'month',
          features: features ? features.split('|') : []
        });
      }
      // Create annual plan if exists
      if (price_annual > 0) {
        platformsMap[id].plans.push({
          id: `${id}_${plan_name.toLowerCase().replace(/\s+/g, '_')}_annual`,
          name: `${plan_name} (Annual)`,
          price: price_annual,
          interval: 'year',
          features: features ? features.split('|') : []
        });
      }
    }
  }

  return Object.values(platformsMap);
};

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ platforms: 0, plans: 0 });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      
      // Read preview
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = parseCSV(event.target.result);
          setPreviewData(parsed);
          setStats({
            platforms: parsed.length,
            plans: parsed.reduce((acc, p) => acc + p.plans.length, 0)
          });
        } catch (err) {
          addToast('error', 'Invalid CSV format: ' + err.message);
          setFile(null);
        }
      };
      reader.readAsText(selectedFile);
    } else {
      addToast('error', 'Please upload a valid .csv file');
    }
  };

  const handleUpload = async () => {
    if (!previewData.length) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      // Chunk array into batches of 400 (safe limit below 500)
      const chunkSize = 400;
      const chunks = [];
      for (let i = 0; i < previewData.length; i += chunkSize) {
        chunks.push(previewData.slice(i, i + chunkSize));
      }

      let processedCount = 0;

      for (const chunk of chunks) {
        const batch = writeBatch(db);
        
        chunk.forEach((platform) => {
          const docRef = doc(db, 'platforms_catalog', platform.id);
          // Use merge: true to update prices without deleting existing bundle info if any
          batch.set(docRef, platform, { merge: true });
        });

        await batch.commit();
        processedCount += chunk.length;
        setProgress(Math.round((processedCount / previewData.length) * 100));
        
        // Small delay to prevent rate limits if massive
        await new Promise(r => setTimeout(r, 100));
      }

      addToast('success', `Successfully imported ${stats.platforms} platforms!`);
      setFile(null);
      setPreviewData([]);
    } catch (error) {
      console.error("Batch upload failed:", error);
      addToast('error', 'Upload failed. Check console for details.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <HeroHeader />
      
      <div className="max-w-4xl mx-auto p-6 pt-24 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-[var(--border)] pb-6">
           <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-2xl text-amber-600 dark:text-amber-400">
             <Database size={32} />
           </div>
           <div>
             <h1 className="text-2xl font-black text-[var(--text-primary)]">Catalog Master Admin</h1>
             <p className="text-sm text-[var(--text-secondary)] font-medium">Bulk upload platform data to Firestore.</p>
           </div>
        </div>

        {/* Upload Area */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-8 text-center relative overflow-hidden group">
           <div className="absolute inset-0 border-2 border-dashed border-[var(--border)] rounded-3xl pointer-events-none group-hover:border-[var(--primary)] transition-colors m-2"></div>
           
           <input 
             type="file" 
             accept=".csv"
             onChange={handleFileChange}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
             disabled={isProcessing}
           />
           
           <div className="flex flex-col items-center justify-center space-y-4 py-8 relative z-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${file ? 'bg-green-100 text-green-600' : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--primary)]'}`}>
                 {file ? <CheckCircle size={32} /> : <UploadCloud size={32} />}
              </div>
              
              <div>
                 <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {file ? file.name : 'Drag & drop CSV here'}
                 </h3>
                 <p className="text-sm text-[var(--text-secondary)]">
                    {file ? `${(file.size / 1024).toFixed(1)} KB` : 'or click to browse files'}
                 </p>
              </div>

              {!file && (
                <div className="text-xs text-[var(--text-muted)] bg-[var(--bg-elevated)] px-3 py-1 rounded-full border border-[var(--border)] font-mono mt-4">
                   Required headers: id, name, category, plan_name, price_monthly...
                </div>
              )}
           </div>
        </div>

        {/* Preview & Actions */}
        {previewData.length > 0 && (
          <div className="animate-in slide-in-from-bottom-4 fade-in space-y-6">
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-4 rounded-2xl flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] font-bold">Platforms found</span>
                  <span className="text-xl font-black text-[var(--text-primary)]">{stats.platforms}</span>
               </div>
               <div className="bg-[var(--bg-surface)] border border-[var(--border)] p-4 rounded-2xl flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)] font-bold">Total plans</span>
                  <span className="text-xl font-black text-[var(--primary)]">{stats.plans}</span>
               </div>
            </div>

            {/* Table Preview */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
               <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-elevated)]">
                  <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                     <FileSpreadsheet size={16} /> Data Preview (First 5)
                  </h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--bg-elevated)] border-b border-[var(--border)]">
                        <tr>
                           <th className="px-6 py-3 font-bold">ID</th>
                           <th className="px-6 py-3 font-bold">Name</th>
                           <th className="px-6 py-3 font-bold">Category</th>
                           <th className="px-6 py-3 font-bold">Plans Count</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[var(--border)]">
                        {previewData.slice(0, 5).map((row) => (
                           <tr key={row.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                              <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                              <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{row.name}</td>
                              <td className="px-6 py-4 text-[var(--text-secondary)]">{row.category}</td>
                              <td className="px-6 py-4">
                                 <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold px-2 py-1 rounded-md">
                                    {row.plans.length}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Action Button */}
            <button
               onClick={handleUpload}
               disabled={isProcessing}
               className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-black py-4 rounded-2xl shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
               {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing Batch ({progress}%)...
                  </>
               ) : (
                  <>
                    <UploadCloud size={20} />
                    Import {stats.platforms} Platforms to Firestore
                  </>
               )}
            </button>
            
            {isProcessing && (
               <div className="w-full bg-[var(--bg-elevated)] rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[var(--primary)] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
               </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
