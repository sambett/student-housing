import React from 'react';
import { DollarSign, MapPin, Phone, Edit2, Trash2 } from 'lucide-react';
import { Property } from '../../types/property';

interface PropertyCardProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {property.rooms} {property.rooms === 1 ? 'Room' : 'Rooms'}
          </span>
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-2">{property.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-700">
            <DollarSign className="mr-2 text-blue-500" size={18} />
            <span className="font-semibold">${property.price}/month</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="mr-2 text-blue-500" size={18} />
            <span>{property.neighborhood}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Phone className="mr-2 text-blue-500" size={18} />
            <span>{property.contactPhone}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex justify-end space-x-2">
          <button
            onClick={() => onEdit(property)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={20} />
          </button>
          <button
            onClick={() => onDelete(property)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;