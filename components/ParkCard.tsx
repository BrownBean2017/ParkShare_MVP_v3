
import React from 'react';
import { Park } from '../types.ts';

interface ParkCardProps {
  park: Park;
  onClick: (id: string) => void;
}

const ParkCard: React.FC<ParkCardProps> = ({ park, onClick }) => {
  return (
    <div 
      className="park-card-hover cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 group"
      onClick={() => onClick(park.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={park.images[0]} 
          alt={park.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-3 right-3 p-2 text-white/80 hover:text-red-500 transition-colors">
          <i className="fas fa-heart text-xl"></i>
        </button>
        <div className="absolute bottom-3 left-3 bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
          {park.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-900 truncate flex-1">{park.name}</h3>
          <div className="flex items-center text-sm font-medium">
            <i className="fas fa-star text-yellow-400 mr-1"></i>
            <span>{park.rating}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm mb-3 flex items-center">
          <i className="fas fa-location-dot mr-1.5 text-xs"></i>
          {park.location}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-baseline space-x-1">
            <span className="font-bold text-lg text-slate-900">${park.pricePerHour}</span>
            <span className="text-slate-500 text-xs">/ hour</span>
          </div>
          <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
            {park.vehicleSize}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkCard;
