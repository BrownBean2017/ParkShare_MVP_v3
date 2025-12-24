
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ParkCard from './components/ParkCard';
import ParkDetail from './components/ParkDetail';
import GeminiConcierge from './components/GeminiConcierge';
import { PARKS } from './constants';
import { View, Park } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedParkId, setSelectedParkId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Driveway', 'Garage', 'Lot', 'Underground'];

  const filteredParks = useMemo(() => {
    if (activeCategory === 'All') return PARKS;
    return PARKS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const selectedPark = useMemo(() => {
    return PARKS.find(p => p.id === selectedParkId) || null;
  }, [selectedParkId]);

  const handleSelectPark = (id: string) => {
    setSelectedParkId(id);
    setView('park-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    setSelectedParkId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header onGoHome={goHome} />

      <main className="flex-grow">
        {view === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="relative h-[450px] flex items-center justify-center bg-slate-900 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=1920&q=80" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                alt="Urban parking garage"
              />
              <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                  Stop Circling. <br/><span className="text-indigo-400">Start Parking.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 mb-8 font-medium max-w-2xl mx-auto">
                  Reserve private driveways, secure garages, and affordable lots in seconds.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                   <div className="bg-white p-1 rounded-2xl shadow-2xl flex items-center w-full max-w-md">
                     <i className="fas fa-location-arrow text-slate-400 ml-4 mr-2"></i>
                     <input type="text" placeholder="Where are you going?" className="flex-grow py-3 px-2 outline-none text-slate-800" />
                     <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                       Search
                     </button>
                   </div>
                </div>
              </div>
            </section>

            {/* Category Filter */}
            <div className="sticky top-16 z-40 bg-white border-b border-slate-200 py-4 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-10 overflow-x-auto no-scrollbar pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex flex-col items-center space-y-2 whitespace-nowrap pb-2 border-b-2 transition-all ${
                        activeCategory === cat 
                          ? 'border-indigo-600 text-indigo-700 opacity-100' 
                          : 'border-transparent text-slate-400 opacity-60 hover:opacity-100 hover:text-slate-600'
                      }`}
                    >
                      <i className={`fas fa-${
                        cat === 'All' ? 'globe' : 
                        cat === 'Driveway' ? 'house' : 
                        cat === 'Garage' ? 'warehouse' : 
                        cat === 'Lot' ? 'square' : 'building-columns'
                      } text-lg`}></i>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Park Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Available Spots</h2>
                  <p className="text-slate-500 mt-1">Verified parking in top urban locations.</p>
                </div>
                <button className="flex items-center space-x-2 border border-slate-300 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                  <i className="fas fa-sliders text-slate-400"></i>
                  <span>Filters</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredParks.map((park) => (
                  <ParkCard 
                    key={park.id} 
                    park={park} 
                    onClick={handleSelectPark} 
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          selectedPark && (
            <ParkDetail 
              park={selectedPark} 
              onBack={goHome} 
            />
          )
        )}
      </main>

      {/* AI Assistant */}
      <GeminiConcierge onSelectPark={handleSelectPark} />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Drivers</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Parking safety</a></li>
                <li><a href="#" className="hover:text-indigo-600">Vehicle guidelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Owners</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">List your driveway</a></li>
                <li><a href="#" className="hover:text-indigo-600">Liability coverage</a></li>
                <li><a href="#" className="hover:text-indigo-600">Owner resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">ParkShare</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">About us</a></li>
                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-1 text-indigo-600">
                <i className="fas fa-square-p"></i>
                <span className="font-bold">ParkShare</span>
              </div>
              <span>© 2025 ParkShare Global</span>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
            <div className="flex items-center space-x-6">
              <span className="flex items-center"><i className="fas fa-globe mr-1.5"></i> English (US)</span>
              <span className="flex items-center font-bold text-slate-800">$ USD</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
