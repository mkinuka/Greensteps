import { useState } from "react";
import AddCarForm from "../components/AddCarForm"

type carsType = {
    id: number;
    name: string;
    fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
    fuelConsumption?: number; // L/100km for petrol/diesel/hybrid
    evEngineType?: string; // For electric vehicles
}


export const CarForm = () => {
    const [cars, setCars] = useState<carsType[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleCars = () => {
        setIsOpen(true)
    }

    const handleCarSubmit = (carData: any) => {
        console.log("Car added:", carData);
        const newCar: carsType = {
            id: Date.now(),
            name: carData.name,
            fuelType: carData.fuelType,
            ...(carData.fuelType === 'electric'
                ? { evEngineType: carData.evEngineType }
                : { fuelConsumption: carData.fuelConsumption }
            )
        };
        setCars(prevCars => [...prevCars, newCar]);
        setIsOpen(false);
    }

    const handleCancel = () => {
        setIsOpen(false);
    }

    return (   
    <>
    <div>
    <h1 className="text-black font-semibold mb-4">Saved cars</h1>
    <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={handleCars}>Add New Car</button>
    { isOpen === true && <AddCarForm onSubmit={handleCarSubmit} onCancel={handleCancel}></AddCarForm>}
    </div>
    <form className="bg-gray-50 p-4 rounded-lg text-black">
      <h3 className="text-xl font-semibold mb-4 text-black">Add Car Journey</h3>
      <input type="number" placeholder="Distance (km)" className="text-black" />
      <select className="text-black">
        <option>Petrol</option>
        <option>Diesel</option>
        <option>Electric</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
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