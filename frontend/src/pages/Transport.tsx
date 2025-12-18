import { useState } from "react";
import { CarFront, Plane, TrainFront } from 'lucide-react';
import { CarForm, FlightForm, TrainForm } from "../components/TransportForms";

type TransportType = "Car" | "Train" | "Flight";

interface Itransport {
  id: string;
  transportType: TransportType;
  lenght: number;
  emissions: number;
  timestamp: string;
};



export const Transport = () => {
  const [selectedTransportType, setSelectedTransportType] = useState<TransportType | null >(null);
  const [totalEmissions, setTotalEmissions] = useState(0);


  const selectTransportType = (transportType: TransportType) => {
    setSelectedTransportType(transportType);
  }


  return (
    <>
      <div className="mr-10vw ml-10vw mt-2vh">
        <h1 className="text-black font-semibold text-4xl mb-8">Transport</h1>
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">

            {/* Todays emissions */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Today's Transport Emissions</h2>
              <div className="text-right">
              <p className="text-4xl font-bold text-green-600">{totalEmissions.toFixed(2)}</p>
              <p className="text-gray-600">kg CO₂e</p>
              </div>
            </div>


          {/* buttons   */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-white">
              <button onClick={() => selectTransportType("Car")}
              className={`p-4 border-2 rounded-lg transition-all ${
              selectedTransportType === "Car" ? 
              "bg-yellow-100 border-yellow-400" : 
              "bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
            }`}>
              <div className="text-3xl mb-1 flex justify-center">{<CarFront color="black" />}</div>
              <div className="text-sm font-medium text-gray-700">Add Car Emissions</div>
              </button>
              
                <button onClick={() => selectTransportType("Train")}
              className={`p-4 border-2 rounded-lg transition-all ${
              selectedTransportType === "Train" ? 
              "bg-yellow-100 border-yellow-400" : 
              "bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
            }`}>
              <div className="text-3xl mb-1 flex justify-center">{<TrainFront color="black" />}</div>
              <div className="text-sm font-medium text-gray-700">Add Train Emissions</div>
              </button>

              <button onClick={() => selectTransportType("Flight")}
              className={`p-4 border-2 rounded-lg transition-all ${
              selectedTransportType === "Flight" ? 
              "bg-yellow-100 border-yellow-400" : 
              "bg-yellow-50 hover:bg-yellow-100 border-yellow-200"
            }`}>
              <div className="text-3xl mb-1 flex justify-center">{<Plane color="black" />}</div>
              <div className="text-sm font-medium text-gray-700">Add Flight Emissions</div>
              </button>
            </div>
            
            {selectedTransportType === "Car" && <CarForm />}
            {selectedTransportType === "Train" && <TrainForm />}
            {selectedTransportType === "Flight" && <FlightForm />}
        </section>
      </div>
    </>
  );
};
