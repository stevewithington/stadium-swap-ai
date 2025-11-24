import React from 'react';
import { FanConfig, SPORTS, ATMOSPHERES } from '../types';

interface ConfigurationPanelProps {
  config: FanConfig;
  setConfig: React.Dispatch<React.SetStateAction<FanConfig>>;
  disabled: boolean;
  onGenerate: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ config, setConfig, disabled, onGenerate }) => {
  
  const handleSportChange = (sport: string) => {
    setConfig(prev => ({ ...prev, sport }));
  };

  const handleAtmosphereChange = (atmosphere: string) => {
    setConfig(prev => ({ ...prev, atmosphere }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
      
      {/* Sport Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Select Sport</label>
        <div className="flex flex-wrap gap-2">
          {SPORTS.map(sport => (
            <button
              key={sport}
              onClick={() => handleSportChange(sport)}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                ${config.sport === sport 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-900' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Team Colors Input */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Team Colors / Name</label>
        <div className="relative">
          <input
            type="text"
            value={config.teamColors}
            onChange={(e) => setConfig(prev => ({ ...prev, teamColors: e.target.value }))}
            placeholder="e.g. Red and White, or 'Chicago Bulls'"
            disabled={disabled}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
             <span className="text-xs text-slate-500">Ex: Green & Gold</span>
          </div>
        </div>
      </div>

      {/* Atmosphere Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Atmosphere</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ATMOSPHERES.map(atm => (
            <div 
              key={atm}
              onClick={() => !disabled && handleAtmosphereChange(atm)}
              className={`px-4 py-3 rounded-lg border cursor-pointer flex items-center justify-between transition-all
                ${config.atmosphere === atm 
                  ? 'border-blue-500 bg-blue-900/20 text-blue-200' 
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-500'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <span className="text-sm font-medium">{atm}</span>
              {config.atmosphere === atm && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || !config.teamColors}
        className={`w-full py-4 rounded-xl font-display text-lg tracking-wide shadow-xl transition-all duration-300 transform hover:-translate-y-1
          ${disabled || !config.teamColors
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed shadow-none' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-900/40 hover:from-blue-500 hover:to-purple-500'
          }
        `}
      >
        {disabled ? 'Processing...' : 'TRANSFORM TO FANS'}
      </button>

      {!config.teamColors && (
        <p className="text-center text-xs text-amber-500/80 mt-2">
          * Please enter team colors to continue
        </p>
      )}
    </div>
  );
};

export default ConfigurationPanel;