import { useState } from "react";
import AddCarForm from "../components/AddCarForm"

interface Car {
  _id: string;
  name: string;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  fuelConsumption: number;
  createdAt: string;
}

interface CarFormProps {
  selectedCar: Car | null;
  myCars: Car[];
  onSelectCar: (car: Car) => void;
}

export const CarForm = ({ selectedCar, myCars, onSelectCar }: CarFormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [distance, setDistance] = useState<number>(0);
    const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(null);

    const handleCars = () => {
        setIsOpen(true);
    }

    const handleCarSubmit = (carData: any) => {
        console.log("Car added:", carData);
        setIsOpen(false);
        // Reload page or refetch cars in parent component
        window.location.reload();
    }

    const handleCancel = () => {
        setIsOpen(false);
    }

    const calculateEmissions = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCar || !distance) {
            alert("Please select a car and enter distance");
            return;
        }

        // Calculate emissions based on fuel type
        // For simplicity: consumption is per 10km, so (distance / 10) * consumption
        const consumptionAmount = (distance / 10) * selectedCar.fuelConsumption;
        
        let emissions = 0;
        if (selectedCar.fuelType === 'petrol') {
            emissions = consumptionAmount * 2.31; // kg CO2 per liter of petrol
        } else if (selectedCar.fuelType === 'diesel') {
            emissions = consumptionAmount * 2.68; // kg CO2 per liter of diesel
        } else if (selectedCar.fuelType === 'hybrid') {
            emissions = consumptionAmount * 2.0; // Reduced emissions for hybrid
        } else if (selectedCar.fuelType === 'electric') {
            emissions = consumptionAmount * 0.5; // kg CO2 per kWh (grid average)
        }

        setCalculatedEmissions(emissions);

        // Save journey to database
        try {
            const response = await fetch('http://localhost:3000/transport/savejourney', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    carId: selectedCar._id,
                    distance,
                    emissions,
                    date: new Date().toISOString().split('T')[0]
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save journey');
            }

            // Reload page to update today's total
            window.location.reload();
        } catch (error) {
            console.error('Error saving journey:', error);
            alert('Journey calculated but failed to save. Please try again.');
        }
    }

    return (   
    <>
    <div>
    <h1 className="text-black font-semibold mb-4">Saved cars</h1>
    {myCars.length === 0 ? (
      <p className="text-gray-600 mb-4">No cars added yet. Add your first car!</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {myCars.map((car) => (
          <button 
            key={car._id} 
            onClick={() => onSelectCar(car)}
            className={`border-2 rounded-lg p-4 text-left transition-all ${
              selectedCar?._id === car._id
                ? 'bg-green-100 border-green-500'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{car.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Fuel Type:</span> {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}</p>
              <p><span className="font-medium">Consumption:</span> {car.fuelConsumption} {car.fuelType === 'electric' ? 'kWh/10km' : 'L/10km'}</p>
              <p className="text-xs text-gray-400">Added: {new Date(car.createdAt).toLocaleDateString()}</p>
            </div>
            {selectedCar?._id === car._id && (
              <div className="mt-2 text-xs font-semibold text-green-600">✓ Selected</div>
            )}
          </button>
        ))}
      </div>
    )}
    <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={handleCars}>Add New Car</button>
    { isOpen === true && <AddCarForm onSubmit={handleCarSubmit} onCancel={handleCancel}></AddCarForm>}
    </div>
    
    {selectedCar ? (
      <form onSubmit={calculateEmissions} className="bg-gray-50 p-4 rounded-lg text-black">
        <h3 className="text-xl font-semibold mb-4 text-black">Calculate Journey Emissions</h3>
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-2">Selected Car: <span className="font-semibold">{selectedCar.name}</span></p>
          <p className="text-xs text-gray-500">
            {selectedCar.fuelType.charAt(0).toUpperCase() + selectedCar.fuelType.slice(1)} - 
            {selectedCar.fuelConsumption} {selectedCar.fuelType === 'electric' ? 'kWh/10km' : 'L/10km'}
          </p>
        </div>
        <input 
          type="number" 
          placeholder="Distance (km)" 
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full p-2 border rounded mb-3 text-black" 
          required
          min="0"
          step="0.1"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
          Calculate Emissions
        </button>
        {calculatedEmissions !== null && (
          <div className="mt-4 p-3 bg-green-100 rounded">
            <p className="text-green-800 font-semibold">Estimated Emissions: {calculatedEmissions.toFixed(2)} kg CO₂e</p>
          </div>
        )}
      </form>
    ) : (
      <div className="bg-gray-50 p-4 rounded-lg text-black">
        <p className="text-gray-600">Please select a car from your saved cars below to calculate journey emissions.</p>
      </div>
    )}
    </>
  );
};

export const TrainForm = () => {
  return (
    <form className="bg-gray-50 p-4 rounded-lg text-black">
      <h3 className="text-xl font-semibold mb-4 text-black">Add Train Journey</h3>
      <input type="number" placeholder="Distance (km)" className="text-black" />
      <select className="text-black">
        <option>Electric Train</option>
        <option>Diesel Train</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  );
};

export const FlightForm = () => {
  return (
    <form className="bg-gray-50 p-4 rounded-lg text-black">
      <h3 className="text-xl font-semibold mb-4 text-black">Add Flight</h3>
      <input type="number" placeholder="Distance (km)" className="text-black" />
      <select className="text-black">
        <option>Economy</option>
        <option>Business</option>
        <option>First Class</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  );
};