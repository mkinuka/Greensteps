import { useState, useEffect } from "react";
import { CarFront, Plane, TrainFront, Trash2 } from "lucide-react";
import { CarForm, FlightForm, TrainForm } from "../components/TransportForms";
import type { Car, Journey, Flight, Itrain } from "../types/transportTypes";
import busrideimg from "../assets/busride.png"
import "../animations.css"

type TransportType = "Car" | "Train" | "Flight";

export const Transport = () => {
  const [selectedTransportType, setSelectedTransportType] =
    useState<TransportType | null>(null);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [myCars, setMyCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [todayJourneys, setTodayJourneys] = useState<Journey[]>([]);
  const [todayFlights, setTodayFlights] = useState<Flight[]>([]);
  const [todayTrains, setTodayTrains] = useState<Itrain[]>([]);

  useEffect(() => {
    fetchMyCars();
    fetchTodayEmissions();
  }, []);

  const fetchMyCars = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/transport/fetchcars",
        { credentials: "include" }
      );
      const data = await response.json();
      setMyCars(data);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const fetchTodayEmissions = async () => {
    try {
      // Fetch car journeys
      const journeysResponse = await fetch(
        "http://localhost:3000/transport/todayjourneys",
        { credentials: "include" }
      );
      const journeysData = await journeysResponse.json();
      const journeysArray = Array.isArray(journeysData) ? journeysData : [];
      setTodayJourneys(journeysArray);

      // Fetch flights
      const flightsResponse = await fetch(
        "http://localhost:3000/transport/todayflights",
        { credentials: "include" }
      );
      const flightsData = await flightsResponse.json();
      const flightsArray = Array.isArray(flightsData.flights)
        ? flightsData.flights
        : [];
      setTodayFlights(flightsArray);

      // Train emissions
      const trainResponse = await fetch(
        "http://localhost:3000/transport/todaytrains",
        { credentials: "include" }
      );
      const trainsData = await trainResponse.json();
      const trainArray = Array.isArray(trainsData.trains)
        ? trainsData.trains
        : [];
      setTodayTrains(trainArray);

      // Calculate total emissions
      const carEmissions = journeysArray.reduce(
        (sum: number, journey: any) => sum + journey.emissions,
        0
      );
      const flightEmissions = flightsArray.reduce(
        (sum: number, flight: any) => sum + flight.emissions,
        0
      );
      const trainEmissions = trainArray.reduce(
        (sum: number, train: any) => sum + train.emissions,
        0
      );
      setTotalEmissions(carEmissions + flightEmissions + trainEmissions);
    } catch (error) {
      console.error("Failed to fetch today's emissions:", error);
    }
  };

  const selectTransportType = (transportType: TransportType) => {
    setSelectedTransportType(transportType);
  };

  const deleteFlight = async (flightId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/transport/deleteflights/${flightId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete flight");
      }

      // Update the state by removing the deleted flight
      setTodayFlights((prev) =>
        prev.filter((flight) => flight._id !== flightId)
      );

      // Recalculate total emissions
      fetchTodayEmissions();

      console.log("Flight deleted successfully");
    } catch (error) {
      console.error("Error deleting flight:", error);
      alert("Failed to delete flight. Please try again.");
    }
  };

  return (
    <>
      <div className="mr-10vw ml-10vw mt-2vh">
        <h1 className="text-black font-bold text-4xl mb-8">Transport</h1>
        <section style={{background:"#FAF0E6"}} className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Todays emissions */}
          <div className="mb-2 flex max-[1000px]:flex-col max-[1000px]:items-center min-[1001px]:justify-center min-[1001px]:items-center gap-4">
          <img src={busrideimg} alt="mascot riding bus" className="h-96 min-[2000px]:h-[550px] w-auto rounded-tr-lg rounded-tl-[40px] rounded-bl-lg rounded-br-lg"/>
          <h4 className="max-[1000px]:hidden text-gray-700 text-lg min-[2000px]:text-2xl leading-relaxed font-semibold max-w-xl min-[2000px]:max-w-3xl text-center bg-green-200 p-12 min-[2000px]:p-16 rounded-full shadow-sm">
            Track your daily transportation carbon footprint with ease. Whether you're commuting by car, taking the train, 
            catching a flight, or riding the bus, we help you monitor and understand the environmental impact of your journeys. 
            Simply select your mode of transport below, enter your trip details, and we'll calculate the CO₂ emissions for you. 
            Every small step toward sustainable travel counts!
          </h4>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Today's Transport Emissions
            </h2>
            <div className="text-right">
              <p className="text-4xl font-bold text-green-600">
                {totalEmissions.toFixed(2)}
              </p>
              <p className="text-gray-600">kg CO₂e</p>
            </div>
          </div>

          {/* buttons   */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <button
              onClick={() => selectTransportType("Car")}
              className="transport-button"
            >
              <div className="text-3xl mb-1 flex justify-center">
                {<CarFront color="currentColor" />}
              </div>
              <div className="text-sm font-medium">
                Add Car Emissions
              </div>
            </button>

            <button
              onClick={() => selectTransportType("Train")}
              className="transport-button"
            >
              <div className="text-3xl mb-1 flex justify-center">
                {<TrainFront color="currentColor" />}
              </div>
              <div className="text-sm font-medium">
                Add Train Emissions
              </div>
            </button>

            <button
              onClick={() => selectTransportType("Flight")}
              className="transport-button"
            >
              <div className="text-3xl mb-1 flex justify-center">
                {<Plane color="currentColor" />}
              </div>
              <div className="text-sm font-medium">
                Add Flight Emissions
              </div>
            </button>
          </div>

          {selectedTransportType === "Car" && (
            <CarForm
              selectedCar={selectedCar}
              myCars={myCars}
              onSelectCar={setSelectedCar}
            />
          )}
          {selectedTransportType === "Train" && <TrainForm />}
          {selectedTransportType === "Flight" && <FlightForm />}

        {/* Today's Trips */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Today's Trips
          </h2>
          {/* Car Transportation */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <CarFront size={24} color="#059669" />
              Today's Car Transportation
            </h3>
            {todayJourneys.length === 0 ? (
              <p className="text-gray-600 ml-8">No car trips recorded today.</p>
            ) : (
              <div className="space-y-3 ml-8">
                {todayJourneys.map((journey) => (
                  <div
                    key={journey._id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {journey.carId?.name || "Unknown Car"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {journey.carId?.fuelType?.charAt(0).toUpperCase() +
                            journey.carId?.fuelType?.slice(1)}{" "}
                          - Distance: {journey.distance} km
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {journey.emissions.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">kg CO₂e</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Train Transportation */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <TrainFront size={24} color="#059669" />
              Today's Train Transportation
            </h3>
            {todayTrains.length === 0 ? (
              <p className="text-gray-600 ml-8">
                No train trips recorded today.
              </p>
            ) : (
              <div className="space-y-3 ml-8">
                {todayTrains.map((train) => (
                  <div
                    key={train._id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {train.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {train.category.charAt(0).toUpperCase() +
                            train.category.slice(1)}{" "}
                          Class - Distance: {train.distance.toFixed(0)} km
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          {train.emissions.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">kg CO₂e</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Flight Transportation */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Plane size={24} color="#059669" />
              Today's Flight Transportation
            </h3>
            {todayFlights.length === 0 ? (
              <p className="text-gray-600 ml-8">No flights recorded today.</p>
            ) : (
              <div className="space-y-3 ml-8">
                {todayFlights.map((flight) => (
                  <div
                    key={flight._id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {flight.departure} → {flight.arrival}
                        </p>
                        <p className="text-sm text-gray-600">
                          {flight.flightClass.charAt(0).toUpperCase() +
                            flight.flightClass.slice(1)}{" "}
                          Class - Distance: {flight.distance.toFixed(0)} km
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            {flight.emissions.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">kg CO₂e</p>
                        </div>
                        <button
                          onClick={() => deleteFlight(flight._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                          title="Delete flight"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
