import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import ConfigurationPanel from './components/ConfigurationPanel';
import ResultView from './components/ResultView';
import { FanConfig, ProcessingStatus, SPORTS, ATMOSPHERES } from './types';
import { transformToFans } from './services/geminiService';

const App: React.FC = () => {
  // State
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [config, setConfig] = useState<FanConfig>({
    sport: SPORTS[0],
    teamColors: '',
    atmosphere: ATMOSPHERES[1],
    intensity: 'High'
  });

  useEffect(() => {
    const checkApiKey = async () => {
      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        const hasKey = await aiStudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      } else {
        // Fallback for dev environments without the wrapper
        setHasApiKey(true);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      await aiStudio.openSelectKey();
      // Assume success after interaction and proceed to avoid race conditions
      setHasApiKey(true);
    }
  };

  const handleImageSelected = (base64: string, mimeType: string) => {
    setOriginalImage(base64);
    setImageMimeType(mimeType);
    setGeneratedImage(null);
    setStatus(ProcessingStatus.IDLE);
    setErrorMsg(null);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setStatus(ProcessingStatus.IDLE);
    setErrorMsg(null);
    setConfig(prev => ({ ...prev, teamColors: '' }));
  };

  const handleGenerate = async () => {
    if (!originalImage) return;

    setStatus(ProcessingStatus.GENERATING);
    setErrorMsg(null);

    try {
      // Small delay to allow UI to update to loading state visually before heavy work
      await new Promise(resolve => setTimeout(resolve, 100));

      const resultBase64 = await transformToFans(originalImage, imageMimeType, config);
      setGeneratedImage(resultBase64);
      setStatus(ProcessingStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      
      // Handle "Requested entity was not found" error which implies invalid/missing API key context
      if (err.message && err.message.includes("Requested entity was not found")) {
        setHasApiKey(false);
        const aiStudio = (window as any).aistudio;
        if (aiStudio) {
             try {
                await aiStudio.openSelectKey();
                setHasApiKey(true);
             } catch (e) {
                console.error("Error opening key selection", e);
             }
        }
        setStatus(ProcessingStatus.IDLE);
        return;
      }

      // If error suggests auth issue, might need to re-prompt, but generic handling for now
      setStatus(ProcessingStatus.ERROR);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-4xl mb-2">
            🏟️
          </div>
          <h1 className="text-3xl font-display font-bold">Stadium Swap AI</h1>
          <p className="text-slate-400">
            To use the high-quality <span className="text-blue-400 font-semibold">Gemini 3.0 Pro</span> model for generating stadium fan images, you need to select a paid API key.
          </p>
          <div className="pt-4">
            <button
              onClick={handleSelectKey}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/40 transition-all transform hover:-translate-y-1"
            >
              Select API Key
            </button>
            <p className="text-xs text-slate-500 mt-4">
              See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-slate-300">billing documentation</a> for details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500 selection:text-white font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-800/50 border border-slate-700 mb-4">
             <span className="text-2xl mr-2">🏟️</span>
             <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Powered by Gemini 3.0 Pro</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Stadium Swap AI
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload a photo of yourself or friends, pick your team, and instantly transport to the electric atmosphere of a packed stadium.
          </p>
        </header>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Controls */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Upload */}
            {!originalImage ? (
              <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-1 border border-slate-700/50">
                 <ImageUpload onImageSelected={handleImageSelected} />
              </div>
            ) : (
              // If image is selected, show small preview and change button
               <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/50 flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                    <img 
                      src={`data:${imageMimeType};base64,${originalImage}`} 
                      className="w-16 h-16 rounded-lg object-cover border border-slate-600" 
                      alt="Thumbnail"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Image Uploaded</p>
                      <p className="text-xs text-slate-400">Ready to transform</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setOriginalImage(null)}
                   disabled={status === ProcessingStatus.GENERATING}
                   className="text-xs text-red-400 hover:text-red-300 underline"
                 >
                   Remove
                 </button>
               </div>
            )}

            {/* 2. Configuration */}
            <ConfigurationPanel 
              config={config} 
              setConfig={setConfig} 
              disabled={!originalImage || status === ProcessingStatus.GENERATING}
              onGenerate={handleGenerate}
            />

            {/* Error Message */}
            {status === ProcessingStatus.ERROR && errorMsg && (
              <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                <strong>Error:</strong> {errorMsg}
              </div>
            )}
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-8">
             <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 min-h-[500px] flex flex-col justify-center">
                {!originalImage ? (
                  <div className="text-center space-y-6 opacity-40">
                    <div className="inline-block p-6 rounded-full bg-slate-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <p className="text-xl font-medium">Upload a photo to start the magic</p>
                  </div>
                ) : (
                  <ResultView 
                    originalImage={originalImage}
                    generatedImage={generatedImage}
                    status={status}
                    onReset={handleReset}
                  />
                )}
             </div>
          </div>

        </div>

        <footer className="mt-20 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Stadium Swap AI. Built with React & Google Gemini 3.0 Pro.</p>
        </footer>

      </div>
    </div>
  );
};

export default App;