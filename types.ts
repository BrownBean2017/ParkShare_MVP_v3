
export interface Park {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  amenities: string[];
  capacity: number;
  category: 'Driveway' | 'Garage' | 'Lot' | 'Underground';
  vehicleSize: 'Compact' | 'SUV' | 'Large' | 'Van';
  security: 'CCTV' | 'Gated' | 'Security Guard' | 'Basic';
}

export interface Booking {
  parkId: string;
  date: string;
  startTime: string;
  duration: number;
  vehiclePlate?: string;
}

export type View = 'home' | 'park-detail';
