import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { Property } from '../../types/property';

interface PropertyFormProps {
  property?: Property | null;
  onSubmit: (data: Omit<Property, 'id'>) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  property, 
  onSubmit, 
  onCancel, 
  isLoading 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    rooms: '',
    address: '',
    neighborhood: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price.toString(),
        rooms: property.rooms.toString(),
        address: property.address,
        neighborhood: property.neighborhood,
        contactPhone: property.contactPhone
      });
    }
  }, [property]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.rooms || Number(formData.rooms) <= 0) newErrors.rooms = 'Valid number of rooms is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Neighborhood is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        rooms: Number(formData.rooms),
        address: formData.address,
        neighborhood: formData.neighborhood,
        contactPhone: formData.contactPhone
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter property title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full p-3 rounded-lg border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter property description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter monthly price"
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${
                errors.rooms ? 'border-red-500' : 'border-gray-300'
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Number of rooms"
            />
            {errors.rooms && <p className="mt-1 text-sm text-red-500">{errors.rooms}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter property address"
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.neighborhood ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter neighborhood"
          />
          {errors.neighborhood && <p className="mt-1 text-sm text-red-500">{errors.neighborhood}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
          <input
            type="tel"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border ${
              errors.contactPhone ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Enter contact phone"
          />
          {errors.contactPhone && <p className="mt-1 text-sm text-red-500">{errors.contactPhone}</p>}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Property
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;