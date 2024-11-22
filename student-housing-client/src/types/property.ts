export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  rooms: number;
  address: string;
  neighborhood: string;
  contactPhone: string;
}

export interface PropertyFilters {
  minPrice: string;
  maxPrice: string;
  minRooms: string;
  neighborhood: string;
}