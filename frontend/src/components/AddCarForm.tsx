import { useState } from 'react';

interface Car {
  id?: string;
  name: string;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  fuelConsumption?: number; // L/100km for petrol/diesel/hybrid
  evEngineType?: string; // For electric vehicles
}

interface AddCarFormProps {
  onSubmit: (car: Omit<Car, 'id'>) => void;
  onCancel?: () => void;
}

const AddCarForm = ({ onSubmit, onCancel }: AddCarFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    fuelType: 'petrol' as 'petrol' | 'diesel' | 'hybrid' | 'electric',
    fuelConsumption: 0,
    evEngineType: 'small'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fuelConsumption' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const carData: Omit<Car, 'id'> = {
      name: formData.name,
      fuelType: formData.fuelType,
      ...(formData.fuelType === 'electric' 
        ? { evEngineType: formData.evEngineType }
        : { fuelConsumption: formData.fuelConsumption }
      )
    };
    
    onSubmit(carData);
    
    // Reset form
    setFormData({
      name: '',
      fuelType: 'petrol',
      fuelConsumption: 0,
      evEngineType: 'small'
    });
  };

  const isElectric = formData.fuelType === 'electric';

  return (
    <form onSubmit={handleSubmit} className="add-car-form bg-gray-50 p-6 rounded-lg text-black">
      <h3 className="text-black text-xl font-semibold mb-4">Add Your Car</h3>
      
      <div className="form-group mb-4">
        <label htmlFor="name" className="text-black block mb-2 font-medium">Car Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
          placeholder="e.g., My Honda, Work Car, Family SUV"
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="fuelType" className="text-black block mb-2 font-medium">Fuel Type</label>
        <select
          id="fuelType"
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded text-black"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybrid</option>
          <option value="electric">Electric (EV)</option>
        </select>
      </div>

      {!isElectric ? (
        <div className="form-group mb-4">
          <label htmlFor="fuelConsumption" className="text-black block mb-2 font-medium">
            Fuel Consumption (L/100km)
          </label>
          <input
            type="number"
            id="fuelConsumption"
            name="fuelConsumption"
            value={formData.fuelConsumption}
            onChange={handleChange}
            required
            step="0.1"
            min="0"
            className="w-full p-2 border rounded text-black"
            placeholder="e.g., 7.5"
          />
        </div>
      ) : (
        <div className="form-group mb-4">
          <label htmlFor="evEngineType" className="text-black block mb-2 font-medium">
            EV Engine Type
          </label>
          <select
            id="evEngineType"
            name="evEngineType"
            value={formData.evEngineType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded text-black"
          >
            <option value="small">Small (≤ 150 kW)</option>
            <option value="compact">Compact (151 - 200 kW)</option>
            <option value="medium">Medium (201 - 300 kW)</option>
            <option value="large">Large (301 - 400 kW)</option>
            <option value="performance">Performance (≥ 401 kW)</option>
          </select>
        </div>
      )}

      <div className="form-actions flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
          Add Car
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCarForm;
