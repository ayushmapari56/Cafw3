export interface DishItem {
  id: string;
  name: string;
  tagline: string;
  courseNumber: string;
  price: number;
  description: string;
  image: string;
  alt: string;
  calories?: number;
  prepTime?: string;
  flavors: string[];
  dietary: string[];
  winePairing: {
    wine: string;
    region: string;
    year: string;
    notes: string;
  };
  nutritionNotes?: string;
}

export interface DeconstructedLayer {
  id: string;
  layerNumber: number;
  title: string;
  subtitle: string;
  description: string;
  temperature: string;
  texture: string;
  origin: string;
  offsetY: number;
  rotation: number;
  image: string;
}

export interface FloatingIngredient {
  id: string;
  name: string;
  image: string;
  initialX: number; // percentage (0-100)
  initialY: number; // percentage (0-100)
  size: number; // px width
  speed: number; // parallax multiplier
  rotationSpeed: number; // deg
  blurAmount?: string;
  zIndex: number;
}

export interface ReservationData {
  experience: string;
  guests: number;
  date: string;
  time: string;
  seating: 'Chef Table' | 'Main Dining Room' | 'Private Botanical Salon';
  specialRequests: string;
  supplements: string[];
  customerName: string;
  email: string;
  phone: string;
}
