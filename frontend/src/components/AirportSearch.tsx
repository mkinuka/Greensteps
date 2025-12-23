import { useState, useEffect, useRef } from 'react';
import type { Airport } from '../utils/airportData';
import { searchAirports } from '../utils/airportData';
import { Plane } from 'lucide-react';

interface AirportSearchProps {
  airports: Airport[];
  onSelect: (airport: Airport) => void;
  placeholder?: string;
  selectedAirport?: Airport | null;
  label?: string;
}

const AirportSearch = ({ 
  airports, 
  onSelect, 
  placeholder = "Search for an airport...",
  selectedAirport = null,
  label = "Airport"
}: AirportSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update display when airport is selected
  useEffect(() => {
    if (selectedAirport) {
      setQuery(`${selectedAirport.name} (${selectedAirport.iata})`);
      setIsOpen(false);
    }
  }, [selectedAirport]);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.length >= 2) {
      const searchResults = searchAirports(airports, value);
      setResults(searchResults);
      setIsOpen(true);
      setHighlightedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (airport: Airport) => {
    onSelect(airport);
    setQuery(`${airport.name} (${airport.iata})`);
    setIsOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
        <Plane 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((airport, index) => (
            <button
              key={airport.id}
              type="button"
              onClick={() => handleSelect(airport)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === highlightedIndex ? 'bg-yellow-50' : ''
              }`}
            >
              <div className="font-medium text-gray-900">
                {airport.name} ({airport.iata})
              </div>
              <div className="text-sm text-gray-600">
                {airport.city}, {airport.country}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <p className="text-gray-500 text-sm">No airports found</p>
        </div>
      )}
    </div>
  );
};

export default AirportSearch;
