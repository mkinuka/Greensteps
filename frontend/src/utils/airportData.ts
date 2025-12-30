export interface Airport {
  id: number;
  name: string;
  city: string;
  country: string;
  iata: string; // 3-letter code like "LAX"
  icao: string; // 4-letter code
  latitude: number;
  longitude: number;
  altitude: number;
  timezone: string;
}

let airportsCache: Airport[] | null = null;

export const fetchAirports = async (): Promise<Airport[]> => {
  if (airportsCache) {
    return airportsCache;
  }

  try {
    // OpenFlights airports.dat CSV from GitHub
    const response = await fetch(
      "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
    );
    const text = await response.text();

    // Parse CSV (format: ID,Name,City,Country,IATA,ICAO,Lat,Lon,Alt,Timezone,DST,Tz,Type,Source)
    const airports = text
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        // Handle quoted fields containing commas
        const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
        if (!matches || matches.length < 8) return null;

        const fields = matches.map((field) => field.replace(/^"|"$/g, ""));

        const iata = fields[4];
        const icao = fields[5];

        // Skip airports without IATA code (many are small/private)
        if (!iata || iata === "\\N" || iata.length !== 3) {
          return null;
        }

        return {
          id: parseInt(fields[0]),
          name: fields[1],
          city: fields[2],
          country: fields[3],
          iata: iata,
          icao: icao === "\\N" ? "" : icao,
          latitude: parseFloat(fields[6]),
          longitude: parseFloat(fields[7]),
          altitude: parseFloat(fields[8]),
          timezone: fields[9] || "",
        };
      })
      .filter((airport): airport is Airport => airport !== null);

    airportsCache = airports;
    console.log(`Loaded ${airports.length} airports`);
    return airports;
  } catch (error) {
    console.error("Failed to fetch airports:", error);
    return [];
  }
};

/**
 * Calculate distance between two airports using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (
  airport1: Airport,
  airport2: Airport
): number => {
  const R = 6371; // Earth's radius in kilometers

  const lat1 = toRadians(airport1.latitude);
  const lat2 = toRadians(airport2.latitude);
  const deltaLat = toRadians(airport2.latitude - airport1.latitude);
  const deltaLon = toRadians(airport2.longitude - airport1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Calculate flight emissions based on distance
 * Source: DEFRA/BEIS emission factors
 */
export const calculateFlightEmissions = (
  distanceKm: number,
  flightClass: "economy" | "premium" | "business" | "first" = "economy"
): number => {
  // Emission factors in kg CO2e per passenger per km
  const emissionFactors = {
    // Short haul (< 3700 km)
    short: {
      economy: 0.15596,
      premium: 0.23394,
      business: 0.23394,
      first: 0.23394,
    },
    // Long haul (>= 3700 km)
    long: {
      economy: 0.14863,
      premium: 0.2285,
      business: 0.42926,
      first: 0.59184,
    },
  };

  const isLongHaul = distanceKm >= 3700;
  const factors = isLongHaul ? emissionFactors.long : emissionFactors.short;

  return distanceKm * factors[flightClass];
};

/**
 * Search airports by name, city, country, or IATA code
 */
export const searchAirports = (
  airports: Airport[],
  query: string
): Airport[] => {
  if (!query || query.length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase();

  return airports
    .filter((airport) => {
      return (
        airport.name.toLowerCase().includes(searchTerm) ||
        airport.city.toLowerCase().includes(searchTerm) ||
        airport.country.toLowerCase().includes(searchTerm) ||
        airport.iata.toLowerCase().includes(searchTerm) ||
        airport.icao.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, 50); // Limit results for performance
};
