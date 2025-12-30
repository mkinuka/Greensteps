import { useState, useEffect } from "react";
import AddCarForm from "../components/AddCarForm";
import AirportSearch from "./AirportSearch";
import type { Airport } from "../utils/airportData";
import {
  fetchAirports,
  calculateDistance,
  calculateFlightEmissions,
} from "../utils/airportData";

interface Car {
  _id: string;
  name: string;
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
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
  const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(
    null
  );

  const handleCars = () => {
    setIsOpen(true);
  };

  const handleCarSubmit = (carData: any) => {
    console.log("Car added:", carData);
    setIsOpen(false);
    // Reload page or refetch cars in parent component
    window.location.reload();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

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
    if (selectedCar.fuelType === "petrol") {
      emissions = consumptionAmount * 2.31; // kg CO2 per liter of petrol
    } else if (selectedCar.fuelType === "diesel") {
      emissions = consumptionAmount * 2.68; // kg CO2 per liter of diesel
    } else if (selectedCar.fuelType === "hybrid") {
      emissions = consumptionAmount * 2.0; // Reduced emissions for hybrid
    } else if (selectedCar.fuelType === "electric") {
      emissions = consumptionAmount * 0.5; // kg CO2 per kWh (grid average)
    }

    setCalculatedEmissions(emissions);

    // Save journey to database
    try {
      const response = await fetch(
        "http://localhost:3000/transport/savejourney",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            carId: selectedCar._id,
            distance,
            emissions,
            date: new Date().toISOString().split("T")[0],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save journey");
      }

      // Reload page to update today's total
      window.location.reload();
    } catch (error) {
      console.error("Error saving journey:", error);
      alert("Journey calculated but failed to save. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-black font-semibold mb-4">Saved cars</h1>
        {myCars.length === 0 ? (
          <p className="text-gray-600 mb-4">
            No cars added yet. Add your first car!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {myCars.map((car) => (
              <button
                key={car._id}
                onClick={() => onSelectCar(car)}
                className={`border-2 rounded-lg p-4 text-left transition-all ${
                  selectedCar?._id === car._id
                    ? "bg-green-100 border-green-500"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {car.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Fuel Type:</span>{" "}
                    {car.fuelType.charAt(0).toUpperCase() +
                      car.fuelType.slice(1)}
                  </p>
                  <p>
                    <span className="font-medium">Consumption:</span>{" "}
                    {car.fuelConsumption}{" "}
                    {car.fuelType === "electric" ? "kWh/10km" : "L/10km"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Added: {new Date(car.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedCar?._id === car._id && (
                  <div className="mt-2 text-xs font-semibold text-green-600">
                    ✓ Selected
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleCars}
        >
          Add New Car
        </button>
        {isOpen === true && (
          <AddCarForm
            onSubmit={handleCarSubmit}
            onCancel={handleCancel}
          ></AddCarForm>
        )}
      </div>

      {selectedCar ? (
        <form
          onSubmit={calculateEmissions}
          className="bg-gray-50 p-4 rounded-lg text-black"
        >
          <h3 className="text-xl font-semibold mb-4 text-black">
            Calculate Journey Emissions
          </h3>
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">
              Selected Car:{" "}
              <span className="font-semibold">{selectedCar.name}</span>
            </p>
            <p className="text-xs text-gray-500">
              {selectedCar.fuelType.charAt(0).toUpperCase() +
                selectedCar.fuelType.slice(1)}{" "}
              -{selectedCar.fuelConsumption}{" "}
              {selectedCar.fuelType === "electric" ? "kWh/10km" : "L/10km"}
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
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
          >
            Calculate Emissions
          </button>
          {calculatedEmissions !== null && (
            <div className="mt-4 p-3 bg-green-100 rounded">
              <p className="text-green-800 font-semibold">
                Estimated Emissions: {calculatedEmissions.toFixed(2)} kg CO₂e
              </p>
            </div>
          )}
        </form>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-black">
          <p className="text-gray-600">
            Please select a car from your saved cars below to calculate journey
            emissions.
          </p>
        </div>
      )}
    </>
  );
};

interface Itrain {
  name: string;
  distance: number;
  category: "tram" | "national" | "underground";
  emissions: number;
  date: string;
}

export const TrainForm = () => {
  const [formData, setFormData] = useState<{
    name: string;
    distance: number;
    category: "tram" | "national" | "underground";
  }>({
    name: "",
    distance: 0,
    category: "national",
  });
  const [calculatedEmissions, setCalculatedEmissions] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Emission factors per km for different train types (kg CO2e)
  const emissionFactors = {
    tram: 0.029, // 29g CO2e per km
    national: 0.035, // 35g CO2e per km
    underground: 0.028, // 28g CO2e per km
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "distance" ? Number(value) : value,
    }));
  };

  const calculateEmissions = (
    distance: number,
    category: "tram" | "national" | "underground"
  ) => {
    return distance * emissionFactors[category];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.distance) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const emissions = calculateEmissions(formData.distance, formData.category);
    setCalculatedEmissions(emissions);

    const trainData: Itrain = {
      ...formData,
      emissions,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(
        "http://localhost:3000/transport/savetrains",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(trainData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save train journey");
      }

      // Reset form and reload page
      setFormData({ name: "", distance: 0, category: "national" });
      setCalculatedEmissions(null);
      window.location.reload();
    } catch (error) {
      console.error("Error saving train journey:", error);
      alert("Journey calculated but failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-lg text-black"
    >
      <h3 className="text-xl font-semibold mb-4 text-black">
        Add Train Journey
      </h3>

      <div className="space-y-4 mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name your journey (e.g., Home to Work)"
          className="w-full p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />

        <input
          type="number"
          name="distance"
          value={formData.distance || ""}
          onChange={handleInputChange}
          placeholder="Distance (km)"
          className="w-full p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
          min="0"
          step="0.1"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="national">National Train</option>
          <option value="tram">Tram</option>
          <option value="underground">Underground Train</option>
        </select>
      </div>

      {calculatedEmissions !== null && (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Estimated Emissions:</span>
            <span className="font-bold text-green-600">
              {calculatedEmissions.toFixed(2)} kg CO₂e
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on {formData.category} train emissions factor
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {loading ? "Saving..." : "Calculate & Save Emissions"}
      </button>
    </form>
  );
};

export const FlightForm = () => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(
    null
  );
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
  const [flightClass, setFlightClass] = useState<
    "economy" | "premium" | "business" | "first"
  >("economy");
  const [distance, setDistance] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAirports = async () => {
      setLoading(true);
      const data = await fetchAirports();
      setAirports(data);
      setLoading(false);
    };
    loadAirports();
  }, []);

  useEffect(() => {
    if (departureAirport && arrivalAirport) {
      const dist = calculateDistance(departureAirport, arrivalAirport);
      setDistance(dist);
      const emis = calculateFlightEmissions(dist, flightClass);
      setEmissions(emis);
    } else {
      setDistance(null);
      setEmissions(null);
    }
  }, [departureAirport, arrivalAirport, flightClass]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!departureAirport || !arrivalAirport || !emissions || !distance) {
      alert("Please select both airports");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/transport/saveflight",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            departure: departureAirport.iata,
            arrival: arrivalAirport.iata,
            distance: distance,
            flightClass: flightClass,
            emissions: emissions,
            date: new Date().toISOString().split("T")[0],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save flight");
      }

      // Reload page to update today's total
      window.location.reload();
    } catch (error) {
      console.error("Error saving flight:", error);
      alert("Flight calculated but failed to save. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-black">
        <p className="text-gray-600">Loading airport data...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg text-black"
    >
      <h3 className="text-xl font-semibold mb-4 text-black">
        Add Flight Journey
      </h3>

      <div className="space-y-4 mb-4">
        <AirportSearch
          airports={airports}
          onSelect={setDepartureAirport}
          selectedAirport={departureAirport}
          placeholder="Search departure airport..."
          label="From"
        />

        <AirportSearch
          airports={airports}
          onSelect={setArrivalAirport}
          selectedAirport={arrivalAirport}
          placeholder="Search arrival airport..."
          label="To"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Flight Class
          </label>
          <select
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>
      </div>

      {distance && emissions && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-700">Distance:</span>
            <span className="font-semibold text-gray-900">
              {distance.toFixed(0)} km
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Estimated Emissions:</span>
            <span className="font-bold text-green-600">
              {emissions.toFixed(2)} kg CO₂e
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {distance >= 3700 ? "Long-haul" : "Short-haul"} flight
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!departureAirport || !arrivalAirport}
        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
          departureAirport && arrivalAirport
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Save Flight Emissions
      </button>
    </form>
  );
};
