import { Property, PropertyFilters } from '../types/property';

const BASE_URL = '/api';

const fetchConfig = {
  mode: 'cors' as RequestMode,
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const propertyService = {
  getAllProperties: async (): Promise<Property[]> => {
    try {
      const response = await fetch(`${BASE_URL}/properties`, {
        ...fetchConfig,
        method: 'GET'
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Failed to fetch properties:', error);
      throw error;
    }
  },

  getProperty: async (id: number): Promise<Property> => {
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      ...fetchConfig,
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to fetch property');
    return response.json();
  },

  createProperty: async (property: Omit<Property, 'id'>): Promise<Property> => {
    const response = await fetch(`${BASE_URL}/properties`, {
      ...fetchConfig,
      method: 'POST',
      headers: {
        ...fetchConfig.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) throw new Error('Failed to create property');
    return response.json();
  },

  updateProperty: async (id: number, property: Omit<Property, 'id'>): Promise<Property> => {
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      ...fetchConfig,
      method: 'PUT',
      headers: {
        ...fetchConfig.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });
    if (!response.ok) throw new Error('Failed to update property');
    return response.json();
  },

  deleteProperty: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/properties/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
      headers: {
        ...fetchConfig.headers,
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Failed to delete property');
  },

  searchProperties: async (filters: PropertyFilters): Promise<Property[]> => {
    const queryParams = new URLSearchParams();
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.minRooms) queryParams.append('minRooms', filters.minRooms);
    if (filters.neighborhood) queryParams.append('neighborhood', filters.neighborhood);

    const response = await fetch(`${BASE_URL}/properties/search?${queryParams}`, {
      ...fetchConfig,
      method: 'GET'
    });
    if (!response.ok) throw new Error('Failed to search properties');
    return response.json();
  },
};