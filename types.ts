
export type UserTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface User {
  id: string;
  name: string;
  phone: string;
  tier: UserTier;
  isAdmin: boolean;
}

export interface HairNews {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
}

export interface MilbonColor {
  id: string;
  name: string;
  code: string;
  hex: string;
  description: string;
  series: 'Ordeve' | 'Addicthy' | 'Crystal';
}

export interface Reservation {
  id: string;
  userId: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  stylist: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export type ViewType = 'home' | 'booking' | 'color' | 'my-bookings' | 'admin' | 'auth';

export interface BookingFormState {
  customerName: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  stylist: string;
}
