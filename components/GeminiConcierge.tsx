
import React, { useState } from 'react';
import { getParkRecommendations } from '../services/gemini.ts';
import { PARKS } from '../constants.ts';

interface GeminiConciergeProps {
  onSelectPark: (id: string) => void;
}

const GeminiConcierge: React.FC<GeminiConciergeProps> = ({ onSelectPark }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ recommendations: any[], message: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const data = await getParkRecommendations(query);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 ${isOpen ? 'w-[350px] sm:w-[400px]' : 'w-auto'}`}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center space-x-2 border-2 border-white"
        >
          <i className="fas fa-sparkles"></i>
          <span className="font-bold pr-2">Smart Finder</span>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[600px] animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <i className="fas fa-sparkles"></i>
              <span className="font-bold">ParkShare Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75 p-1">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto min-h-[150px]">
            {result ? (
              <div className="space-y-4">
                <p className="text-slate-700 italic text-sm">"{result.message}"</p>
                <div className="space-y-3">
                  {result.recommendations.map((rec: any, idx: number) => {
                    const park = PARKS.find(p => p.id === rec.parkId);
                    if (!park) return null;
                    return (
                      <div 
                        key={idx} 
                        className="bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-indigo-300 transition-colors cursor-pointer group"
                        onClick={() => onSelectPark(park.id)}
                      >
                        <h4 className="font-bold text-indigo-900 text-sm group-hover:text-indigo-600 flex justify-between">
                          {park.name}
                          <i className="fas fa-chevron-right text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">{rec.reasoning}</p>
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => setResult(null)}
                  className="text-xs text-indigo-600 font-bold hover:underline"
                >
                  Clear results & start over
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500 mx-auto mb-3">
                   <i className="fas fa-car-side text-xl"></i>
                </div>
                <p className="text-slate-600 text-sm font-medium">
                  Need a spot? Tell me your vehicle type and where you're headed.
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-slate-50">
            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'SUV spot near LAX with CCTV'"
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
              />
              <button 
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GeminiConcierge;
