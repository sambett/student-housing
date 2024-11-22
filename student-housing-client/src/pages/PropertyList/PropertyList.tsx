import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Property, PropertyFilters } from '../../types/property';
import { propertyService } from '../../services/propertyService';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyForm from '../../components/PropertyForm/PropertyForm';
import SearchForm from '../../components/SearchForm/SearchForm';

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({
    minPrice: '',
    maxPrice: '',
    minRooms: '',
    neighborhood: ''
  });

  
  const fetchProperties = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await propertyService.getAllProperties();
      // Only set state if component is mounted
      setProperties(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []); 

  useEffect(() => {
    let mounted = true;
    
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await propertyService.getAllProperties();
        if (mounted) {
          setProperties(data);
        }
      } catch (error) {
        if (mounted) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties';
          setError(errorMessage);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await propertyService.searchProperties(filters);
      setProperties(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search properties. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (property: Property) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        setIsLoading(true);
        setError(null);
        await propertyService.deleteProperty(property.id);
        await fetchProperties();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete property. Please try again later.';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (data: Omit<Property, 'id'>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      if (selectedProperty) {
        await propertyService.updateProperty(selectedProperty.id, data);
      } else {
        await propertyService.createProperty(data);
      }
      await fetchProperties();
      setShowForm(false);
      setSelectedProperty(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save property. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Student Housing Portal
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <SearchForm 
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <PropertyForm
          property={selectedProperty}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
          isLoading={isSubmitting}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onEdit={() => handleEdit(property)}
              onDelete={() => handleDelete(property)}
            />
          ))}
          {properties.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No properties found. Try adjusting your search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyList;