// src/types/index.ts (or wherever your types are defined)

export interface MenuItem {
  _id: string;
  restaurant_id: string; // e.g. "rest_001"
  name: string;
  category: string;
  price: number;
  estimated_calories: number; // ✅ correct field name from your JSON
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  confidence: string;
  tags: string[];
  image_url?: string | null;
}

export interface Restaurant {
  _id: string; // e.g. "rest_001"
  name: string;
  city: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  cuisine: string[];
  rating: number;
  delivery_time_min: number;
  image_url?: string | null;
}
