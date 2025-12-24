
import React, { useState } from 'react';
import { Park } from '../types';

interface ParkDetailProps {
  park: Park;
  onBack: () => void;
}

const ParkDetail: React.FC<ParkDetailProps> = ({ park, onBack }) => {
  const [booked, setBooked] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => setBooked(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-600 hover:text-indigo-700 mb-6 font-medium transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Back to listings
      </button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{park.name}</h1>
        <div className="flex items-center space-x-4 text-sm font-medium text-slate-600">
          <div className="flex items-center">
            <i className="fas fa-star text-yellow-400 mr-1"></i>
            <span>{park.rating}</span>
            <span className="mx-1">·</span>
            <span className="underline">{park.reviewsCount} reviews</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-shield-halved text-indigo-500 mr-1.5"></i>
            <span>{park.security}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-car mr-1.5"></i>
            <span>Fits up to {park.vehicleSize}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] mb-8 overflow-hidden rounded-2xl">
        <img src={park.images[0]} alt={park.name} className="w-full h-full object-cover" />
        <div className="grid grid-rows-2 gap-4 h-full">
           <img src={park.images[1] || 'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?auto=format&fit=crop&w=800&q=80'} alt={park.name} className="w-full h-full object-cover" />
           <div className="relative h-full">
             <img src={park.images[2] || 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80'} alt={park.name} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
               <button className="bg-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Show all photos</button>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center pb-6 border-b border-slate-200 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Private parking spot hosted by Community</h2>
              <p className="text-slate-500">{park.category} · {park.security} · Instant Booking</p>
            </div>
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
              <i className="fas fa-key text-2xl"></i>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex items-start space-x-4">
              <i className="fas fa-bolt text-2xl text-indigo-600 mt-1"></i>
              <div>
                <h3 className="font-bold text-slate-900">Instant Approval</h3>
                <p className="text-slate-500 text-sm">Once you book, the spot is yours immediately. No waiting for host approval.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-mobile-screen-button text-2xl text-indigo-600 mt-1"></i>
              <div>
                <h3 className="font-bold text-slate-900">Digital Access</h3>
                <p className="text-slate-500 text-sm">Use the app to open the gate or get your digital entry code.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">About this parking spot</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
              {park.description}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Features & Amenities</h2>
            <div className="grid grid-cols-2 gap-4">
              {park.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-slate-700">
                  <i className="fas fa-circle-check text-indigo-600"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 bg-white border border-slate-200 rounded-3xl shadow-xl">
            <div className="flex justify-between items-baseline mb-6">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-slate-900">${park.pricePerHour}</span>
                <span className="text-slate-500">/ hour</span>
              </div>
              <div className="text-indigo-600 font-bold text-sm bg-indigo-50 px-2 py-1 rounded">
                Save 20% weekly
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid grid-cols-1 border border-slate-300 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-slate-300">
                  <label className="block text-[10px] font-bold uppercase text-slate-500">Date & Start Time</label>
                  <input type="datetime-local" className="w-full text-sm outline-none bg-transparent" required />
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-3 border-r border-slate-300">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">Duration</label>
                    <select className="w-full text-sm outline-none bg-transparent" required>
                      <option value="1">1 Hour</option>
                      <option value="2">2 Hours</option>
                      <option value="4">4 Hours</option>
                      <option value="8">8 Hours</option>
                      <option value="24">24 Hours</option>
                    </select>
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-bold uppercase text-slate-500">License Plate</label>
                    <input type="text" placeholder="ABC-123" className="w-full text-sm outline-none bg-transparent uppercase" required />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={booked}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all active:scale-95 ${
                  booked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                {booked ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-check-circle mr-2"></i> Spot Secured!
                  </span>
                ) : 'Reserve Spot'}
              </button>
            </form>

            <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">${park.pricePerHour} x 4 hours</span>
                <span className="text-slate-900">${park.pricePerHour * 4}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Booking fee</span>
                <span className="text-slate-900">$1.50</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-slate-100">
                <span className="text-slate-900">Total</span>
                <span className="text-slate-900">${park.pricePerHour * 4 + 1.50}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetail;
