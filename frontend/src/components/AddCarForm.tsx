import { useState } from 'react';

export interface Car {
  id?: string;
  name: string;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  fuelConsumption: number;
  timeStamp: string;
}

interface AddCarFormProps {
  onSubmit: (car: Omit<Car, 'id'>) => void;
  onCancel?: () => void;
}

const AddCarForm = ({ onSubmit, onCancel }: AddCarFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    fuelType: 'petrol' as 'petrol' | 'diesel' | 'hybrid' | 'electric',
    fuelConsumption: 0
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fuelConsumption' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const carData: Omit<Car, 'id'> = {
      name: formData.name,
      fuelType: formData.fuelType,
      fuelConsumption: formData.fuelConsumption,
      timeStamp: new Date().toISOString().split('T')[0],
    };
    
    try {
      const response = await fetch('http://localhost:3000/transport/uploadcars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(carData)
      });

      if (!response.ok) {
        throw new Error('Failed to save car');
      }

      const savedCar = await response.json();
      onSubmit(savedCar);
      
      setFormData({
        name: '',
        fuelType: 'petrol',
        fuelConsumption: 0
      });
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save car. Please try again.');
    }
  };

  const isElectric = formData.fuelType === 'electric';
  const consumptionLabel = isElectric ? 'Energy Consumption (kWh/10km)' : 'Fuel Consumption (L/10km)';
  const consumptionPlaceholder = isElectric ? 'e.g., 1.85' : 'e.g., 0.75';

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

      <div className="form-group mb-4">
        <label htmlFor="fuelConsumption" className="text-black block mb-2 font-medium">
          {consumptionLabel}
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
          placeholder={consumptionPlaceholder}
        />
      </div>

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
