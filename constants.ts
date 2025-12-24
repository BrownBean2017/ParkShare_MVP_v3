
import { Park } from './types';

export const PARKS: Park[] = [
  {
    id: '1',
    name: 'Secure Downtown Garage',
    location: 'Financial District, NYC',
    pricePerHour: 15,
    rating: 4.8,
    reviewsCount: 342,
    images: [
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Clean, well-lit underground parking in the heart of the Financial District. 24/7 access with high-speed elevator to street level.',
    amenities: ['CCTV', 'EV Charging', 'Handicap Access', 'Elevator'],
    capacity: 5,
    category: 'Underground',
    vehicleSize: 'SUV',
    security: 'Security Guard'
  },
  {
    id: '2',
    name: 'Westside Residential Driveway',
    location: 'Santa Monica, CA',
    pricePerHour: 8,
    rating: 4.9,
    reviewsCount: 120,
    images: [
      'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Private driveway 2 blocks from the beach. Perfect for a day trip. Very safe residential street with plenty of space for a large van.',
    amenities: ['Private Entrance', 'Gated'],
    capacity: 1,
    category: 'Driveway',
    vehicleSize: 'Van',
    security: 'Gated'
  },
  {
    id: '3',
    name: 'Airport Long-Term Lot',
    location: 'Near LAX, CA',
    pricePerHour: 4,
    rating: 4.5,
    reviewsCount: 850,
    images: [
      'https://images.unsplash.com/photo-1590674899484-13da0d1b58f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Affordable open-air lot with shuttle service to the airport every 15 minutes. Fenced with 24/7 staff.',
    amenities: ['Shuttle', 'Fenced', '24/7 Staff'],
    capacity: 50,
    category: 'Lot',
    vehicleSize: 'Large',
    security: 'CCTV'
  },
  {
    id: '4',
    name: 'Museum District Garage',
    location: 'South Loop, Chicago',
    pricePerHour: 12,
    rating: 4.7,
    reviewsCount: 95,
    images: [
      'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Premium heated garage parking. Steps away from the Field Museum and Soldier Field.',
    amenities: ['Heated', 'Tesla Wall Connector', 'Automatic Gate'],
    capacity: 3,
    category: 'Garage',
    vehicleSize: 'SUV',
    security: 'Gated'
  },
  {
    id: '5',
    name: 'Downtown Compact Spot',
    location: 'Austin, TX',
    pricePerHour: 6,
    rating: 4.6,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Small, affordable spot perfect for compact cars. Tucked away in a quiet alley but right next to Congress Ave.',
    amenities: ['Lighting'],
    capacity: 1,
    category: 'Driveway',
    vehicleSize: 'Compact',
    security: 'Basic'
  }
];
