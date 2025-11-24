import React from 'react';
import { ProcessingStatus } from '../types';

interface ResultViewProps {
  originalImage: string | null;
  generatedImage: string | null;
  status: ProcessingStatus;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ originalImage, generatedImage, status, onReset }) => {
  
  if (!originalImage) return null;

  const isGenerating = status === ProcessingStatus.GENERATING;
  const isSuccess = status === ProcessingStatus.SUCCESS;

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-700">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Original</h3>
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-lg group">
            <img 
              src={`data:image/jpeg;base64,${originalImage}`} // Assuming jpeg for simplicity in prefix, though handled dynamically in logic
              alt="Original" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Result / Loading */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Stadium Fan Mode</h3>
            {isSuccess && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">
                 Generated
               </span>
            )}
          </div>
          
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow-lg group">
            {generatedImage ? (
              <>
                <img 
                  src={generatedImage} 
                  alt="Generated Fan Version" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <a 
                    href={generatedImage} 
                    download="stadium-swap-fan.png"
                    className="w-full bg-white text-slate-900 py-2 rounded-lg font-semibold text-center hover:bg-slate-100"
                  >
                    Download Image
                  </a>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-800/50">
                {isGenerating ? (
                   <div className="flex flex-col items-center space-y-4">
                     <div className="relative w-16 h-16">
                       <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                     </div>
                     <p className="text-blue-200 font-medium animate-pulse">Generating the crowd...</p>
                     <p className="text-xs text-slate-400 max-w-[200px] text-center">Gemini is stitching your jerseys and painting the field.</p>
                   </div>
                ) : (
                  <div className="text-slate-500 flex flex-col items-center">
                    <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Result will appear here</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="flex justify-center pt-6">
          <button 
            onClick={onReset}
            className="px-6 py-2 rounded-full border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultView;