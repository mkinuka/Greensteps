import { useState, useEffect } from "react";
import {
  Car,
  Pizza,
  TrainFront,
  Plane,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  BusFront,
} from "lucide-react";
import { useDate } from "../contexts/DateContext";

export const DashBoard = () => {
  const { selectedDate, setSelectedDate, formatDateForDisplay } = useDate();
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [categoryEmissions, setCategoryEmissions] = useState({
    transport: 0,
    food: 0,
    flights: 0,
    trains: 0,
    buses: 0,
    shopping: 0,
  });
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmissionsForDate(selectedDate);
    fetchUserName();
  }, [selectedDate]);

  const fetchEmissionsForDate = async (date: string) => {
    try {
      setLoading(true);

      const transportResponse = await fetch(
        `http://localhost:3000/transport/journeysbydate?date=${date}`,
        { credentials: "include" }
      );
      const transportData = await transportResponse.json();
      const transportEmissions = transportData.reduce(
        (sum: number, journey: any) => sum + journey.emissions,
        0
      );

      const foodResponse = await fetch(
        `http://localhost:3000/food/mealsbydate?date=${date}`,
        { credentials: "include" }
      );
      const foodData = await foodResponse.json();
      const foodEmissions = foodData.totalEmissions || 0;

      const flightResponse = await fetch(
        `http://localhost:3000/transport/flightsbydate?date=${date}`,
        { credentials: "include" }
      );
      const flightData = await flightResponse.json();
      const flightEmissions = flightData.totalEmissions || 0;

      const trainResponse = await fetch(
        `http://localhost:3000/transport/trainsbydate?date=${date}`,
        { credentials: "include" }
      );
      const trainData = await trainResponse.json();
      const trainEmissions = trainData.totalEmissions || 0;

      const shoppingResponse = await fetch(
        `http://localhost:3000/shopping/itemsbydate?date=${date}`,
        { credentials: "include" }
      );
      const shoppingdata = await shoppingResponse.json();
      const shoppingEmissions = shoppingdata.totalEmissions || 0;

      const busResponse = await fetch(
        `http://localhost:3000/transport/busesbydate?date=${date}`,
        { credentials: "include" }
      );
      const busData = await busResponse.json();
      const busEmissions = busData.totalEmissions || 0;

      const total =
        transportEmissions +
        foodEmissions +
        flightEmissions +
        trainEmissions +
        busEmissions +
        shoppingEmissions;

      setTotalEmissions(total);
      setCategoryEmissions({
        transport: transportEmissions,
        food: foodEmissions,
        flights: flightEmissions,
        trains: trainEmissions,
        buses: busEmissions,
        shopping: shoppingEmissions,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch emissions:", error);
      setLoading(false);
    }
  };

  // Function to change date
  const changeDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  // Quick date buttons
  const goToToday = () => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  const goToYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setSelectedDate(yesterday.toISOString().split("T")[0]);
  };

  const fetchUserName = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });
      const data = await response.json();
      setUserName(data.user?.name || "User");
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUserName("User");
    }
  };

  return (
    <>
      <div className="mr-10vw ml-10vw mt-2vh">
        <h1 className="text-black font-semibold text-4xl mb-2">Dashboard</h1>
        <p className="text-gray-600 text-xl mb-8">Welcome, {userName}!</p>

        {/* Global date selector */}
        <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between max-[1200px]:flex-col">
            <div className="flex items-center gap-4 max-[500px]:flex-col">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Date
              </h2>
              <div className="flex items-center gap-2 max-[1200px]:mb-2">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Previous day"
                >
                  <ChevronLeft color="black" size={20} />
                </button>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={() => changeDate(1)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Next day"
                >
                  <ChevronRight color="black" size={20} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={goToYesterday}
                className="text-black px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
              >
                Yesterday
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors text-sm"
              >
                Today
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between max-[1200px]:flex-col">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {formatDateForDisplay(selectedDate)} Total Emissions
              </h2>
              <p className="text-gray-600">
                All categories combined for {selectedDate}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right max-[1200px]:flex max-[1200px]:gap-2 max-[1200px]:mt-2">
                {loading ? (
                  <p className="text-3xl font-bold text-gray-400">Loading...</p>
                ) : (
                  <>
                    <p className="text-5xl font-bold text-green-600">
                      {totalEmissions.toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-lg">kg CO₂e</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Stats
            </h3>
            <p className="text-gray-600 mb-4">Today's emissions by category</p>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <Car></Car> Car Transport
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.transport.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <Pizza></Pizza> Food
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.food.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <Plane></Plane> Flights
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.flights.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <TrainFront></TrainFront> Trains
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.trains.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <BusFront></BusFront> Buses
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.buses.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium flex gap-2">
                    <ShoppingBag></ShoppingBag> Shopping
                  </span>
                  <span className="text-green-600 font-semibold">
                    {categoryEmissions.shopping.toFixed(2)} kg CO₂e
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-bold">Total</span>
                    <span className="text-green-600 font-bold text-lg">
                      {totalEmissions.toFixed(2)} kg CO₂e
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Environmental Impact
            </h3>
            <p className="text-gray-600">
              See how your choices affect the planet
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
