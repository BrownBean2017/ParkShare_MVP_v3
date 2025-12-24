
import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={onGoHome}
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white mr-3 group-hover:bg-indigo-700 transition-colors">
              <i className="fas fa-square-p text-xl"></i>
            </div>
            <span className="text-2xl font-bold text-slate-800 tracking-tight">ParkShare</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search by city, airport, or landmark..." 
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              />
              <div className="absolute left-3 top-2.5 text-slate-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-sm font-medium text-slate-600 hover:text-indigo-700 hidden sm:block">Rent your space</button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <i className="fas fa-map"></i>
            </button>
            <div className="flex items-center border border-slate-300 rounded-full p-1 pl-3 hover:shadow-md transition-shadow cursor-pointer">
              <i className="fas fa-bars text-slate-500 mr-3"></i>
              <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
