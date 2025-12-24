
import React, { useState, useMemo } from 'react';
import { PARKS } from './constants.ts';
import { Park, View } from './types.ts';
import { getParkRecommendations } from './services/gemini.ts';

// --- Components ---

const Header: React.FC<{ onGoHome: () => void }> = ({ onGoHome }) => (
  <header className="sticky top-0 z-50 glass-nav border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center cursor-pointer group" onClick={onGoHome}>
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-3 group-hover:bg-indigo-700 transition-colors">
            <i className="fas fa-square-p text-xl"></i>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">ParkShare_MVP_v3</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">GHBanner</span>
          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
            <i className="fas fa-user text-sm"></i>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const ParkCard: React.FC<{ park: Park; onClick: (id: string) => void }> = ({ park, onClick }) => (
  <div 
    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 cursor-pointer group"
    onClick={() => onClick(park.id)}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={park.images[0]} alt={park.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute bottom-3 left-3 bg-indigo-600/90 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
        {park.category}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-slate-900 truncate">{park.name}</h3>
        <span className="text-sm font-medium"><i className="fas fa-star text-yellow-400 mr-1"></i>{park.rating}</span>
      </div>
      <p className="text-slate-500 text-sm mt-1">{park.location}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="font-bold text-lg text-slate-900">${park.pricePerHour}<span className="text-slate-500 text-xs font-normal">/hr</span></span>
        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{park.vehicleSize}</span>
      </div>
    </div>
  </div>
);

const ParkDetail: React.FC<{ park: Park; onBack: () => void }> = ({ park, onBack }) => {
  const [booked, setBooked] = useState(false);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="mb-6 text-slate-500 hover:text-indigo-600 flex items-center">
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>
      <img src={park.images[0]} className="w-full h-64 object-cover rounded-3xl mb-6 shadow-xl" />
      <h1 className="text-3xl font-bold mb-2">{park.name}</h1>
      <p className="text-slate-500 mb-6">{park.location} · {park.security}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-slate-600 leading-relaxed mb-8">{park.description}</p>
          <h2 className="text-xl font-bold mb-4">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {park.amenities.map(a => (
              <span key={a} className="bg-slate-100 px-3 py-1 rounded-full text-sm">{a}</span>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-xl h-fit">
          <div className="text-2xl font-bold mb-4">${park.pricePerHour}/hr</div>
          <button 
            onClick={() => setBooked(true)}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${booked ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {booked ? 'Reserved!' : 'Book Now'}
          </button>
          <p className="text-xs text-slate-400 text-center mt-4">No hidden fees · Free cancellation</p>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPark = useMemo(() => PARKS.find(p => p.id === selectedId), [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setView('park-detail');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onGoHome={() => setView('home')} />
      
      {view === 'home' ? (
        <>
          <section className="bg-indigo-900 text-white py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Built with AI Studio</h1>
              <p className="text-xl md:text-2xl text-indigo-200 mb-8 font-medium">
                The fastest path from prompt to production with Gemini.
              </p>
              <button 
                className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
                onClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start building
              </button>
            </div>
          </section>

          <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Nearby Available Spots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PARKS.map(park => (
                <ParkCard key={park.id} park={park} onClick={handleSelect} />
              ))}
            </div>
          </section>
        </>
      ) : (
        selectedPark && <ParkDetail park={selectedPark} onBack={() => setView('home')} />
      )}

      <footer className="border-t border-slate-200 py-8 text-center text-slate-400 text-sm">
        <p>&copy; 2025 ParkShare_MVP_v3 · Created for Demo</p>
      </footer>
    </div>
  );
};

export default App;
