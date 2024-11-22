import React from 'react';
import { Search, DollarSign, Bed, Building } from 'lucide-react';
import { PropertyFilters } from '../../types/property';

interface SearchFormProps {
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            name="minRooms"
            placeholder="Min Rooms"
            className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.minRooms}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            name="neighborhood"
            placeholder="Neighborhood"
            className="w-full pl-10 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.neighborhood}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        onClick={onSearch}
        className="mt-4 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
      >
        <Search size={20} />
        Search Properties
      </button>
    </div>
  );
};

export default SearchForm;