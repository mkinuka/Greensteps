export interface Car {
  _id: string;
  name: string;
  fuelType: "petrol" | "diesel" | "hybrid" | "electric";
  fuelConsumption: number;
  createdAt: string;
}

export interface Journey {
  _id: string;
  carId: Car;
  distance: number;
  emissions: number;
  date: string;
  createdAt: string;
}

export interface Flight {
  _id: string;
  departure: string;
  arrival: string;
  distance: number;
  flightClass: string;
  emissions: number;
  date: string;
  createdAt: string;
}

export interface Itrain {
  _id: string;
  departure: string;
  arrival: string;
  distance: number;
  category: "tram" | "national" | "underground";
  emissions: number;
  date: string;
  createdAt: string;
}

export interface Ibus {
  _id: string;
  departure: string;
  arrival: string;
  duration: number;
  timeUnit: "minutes" | "hours";
  trafficType: "countryside" | "highway" | "city";
  distance: number;
  emissions: number;
  date: string;
  createdAt: string;
}
