export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Apparel' | 'Footwear' | 'Equipment' | 'Recovery' | 'Nutrition' | 'Passes' | string;
  sport: 'All' | 'Basketball' | 'Tennis' | 'Training' | 'All-Sport' | string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  image: string;
  badge?: string;
  isNewDrop?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  description: string;
  features?: string[];
  specs?: string[];
  sizes?: string[];
  colors?: ProductColor[] | string[];
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type TrackingTab = 'Activity' | 'Diet' | 'Sleep';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Athlete' | 'Pro Coach' | 'Referee / Official' | 'Campus Director';
  membershipTier: 'Standard Member' | 'Pro Athlete' | 'Olympic Elite';
  avatar: string;
  campusPoints: number;
  qrToken: string;
  joinedDate: string;
  phone: string;
  emergencyContact: string;
  primarySport: 'Basketball' | 'Tennis' | 'Functional Training' | 'Track & Field';
  readinessScore: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  sport: string;
  size?: string;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  shippingMethod: 'Home Express Delivery' | 'Campus Smart Locker Pickup';
  shippingAddress: string;
  paymentMethod: 'Credit Card' | 'Instant QRIS' | 'Bank Virtual Account' | 'Apple Pay';
  status: 'Processing' | 'Packaging' | 'In Transit' | 'Ready for Pickup / Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface BookingRecord {
  id: string;
  facilityName: string;
  category: 'Hardwood Court' | 'Roland Clay Tennis' | 'Hydro Recovery' | 'Biomechanics Lab';
  coachName?: string;
  date: string;
  timeSlot: string;
  courtNumber: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  price: string;
  qrPassCode: string;
}

export interface TournamentMatch {
  id: string;
  round: 'Quarterfinals' | 'Semifinals' | 'Championship Final';
  teamA: {
    name: string;
    seed: number;
    score: number;
    logo?: string;
  };
  teamB: {
    name: string;
    seed: number;
    score: number;
    logo?: string;
  };
  court: string;
  time: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  winner?: 'A' | 'B';
}

export interface CourtZoneTelemetry {
  id: string;
  name: string;
  zone: string;
  accuracy: number;
  arcAngle: number;
  velocity: number;
  attempts: number;
  made: number;
  status: 'Elite' | 'Optimal' | 'Calibrating';
  color: string;
}

export interface SparringAthlete {
  id: string;
  name: string;
  sport: 'Basketball' | 'Tennis' | 'Track & Sprint';
  elo: number;
  divisionRank: number;
  tier: 'Olympic Elite' | 'Pro Athlete' | 'Competitive' | 'Rising Star';
  winLoss: string;
  winStreak: number;
  avatar: string;
  preferredCourt: string;
  availableSlot: string;
  verifiedBadge: boolean;
  skills: string[];
}
