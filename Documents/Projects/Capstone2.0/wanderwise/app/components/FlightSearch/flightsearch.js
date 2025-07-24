'use client'
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Users, Plane, ArrowRight, Filter, X } from 'lucide-react';
import { toast } from '../ui/sonner';

// Common airports with city names
const AIRPORTS = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy International' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International' },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport' },
  { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International' },
  // Add more airports as needed
];

const FlightSearch = ({ initialDestination = "" }) => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: initialDestination,
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    tripType: 'oneway'
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: '',
    airlines: [],
    stops: 'any',
    duration: 'any'
  });
  const [suggestions, setSuggestions] = useState({
    origin: [],
    destination: []
  });

  // Handle airport suggestions
  const handleAirportInput = (type, value) => {
    if (!value) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    const filtered = AIRPORTS.filter(airport => 
      airport.code.toLowerCase().includes(value.toLowerCase()) ||
      airport.city.toLowerCase().includes(value.toLowerCase()) ||
      airport.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 5);

    setSuggestions(prev => ({ ...prev, [type]: filtered }));
  };

  // Select airport from suggestions
  const selectAirport = (type, airport) => {
    setSearchParams(prev => ({ ...prev, [type]: airport.code }));
    setSuggestions(prev => ({ ...prev, [type]: [] }));
  };

  const handleSearch = async () => {
    // Validate inputs
    if (!searchParams.origin || !searchParams.destination || !searchParams.departureDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (searchParams.origin === searchParams.destination) {
      toast.error('Origin and destination cannot be the same');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults,
        children: searchParams.children,
        infants: searchParams.infants
      });

      if (searchParams.tripType === 'roundtrip' && searchParams.returnDate) {
        queryParams.append('returnDate', searchParams.returnDate);
      }

      const response = await fetch(`/api/flights?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch flights');
      }
      
      const data = await response.json();
      setFlights(data || []);
      
      if (data.length === 0) {
        toast.info('No flights found for your search criteria');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      console.error('Error searching flights:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter flights based on criteria
  const filteredFlights = flights.filter(flight => {
    if (filters.maxPrice) {
      const flightPrice = parseInt(flight.price.total.replace(/,/g, ''));
      if (flightPrice > parseInt(filters.maxPrice)) {
        return false;
      }
    }
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.itineraries[0].segments[0].carrierCode)) {
      return false;
    }
    if (filters.stops !== 'any') {
      const stops = flight.itineraries[0].segments.length - 1;
      if (filters.stops === 'direct' && stops > 0) return false;
      if (filters.stops === '1stop' && stops !== 1) return false;
    }
    return true;
  });

  const formatTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Perfect Flight</h1>
        
        {/* Trip Type Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'oneway' }))}
            className={`px-4 py-2 rounded-lg ${
              searchParams.tripType === 'oneway'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'roundtrip' }))}
            className={`px-4 py-2 rounded-lg ${
              searchParams.tripType === 'roundtrip'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Round Trip
          </button>
        </div>

        {/* Search Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <div className="relative">
              <input
                type="text"
                value={searchParams.origin}
                onChange={(e) => {
                  setSearchParams(prev => ({ ...prev, origin: e.target.value.toUpperCase() }));
                  handleAirportInput('origin', e.target.value);
                }}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Airport or City"
              />
              <Plane className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {suggestions.origin.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                {suggestions.origin.map(airport => (
                  <button
                    key={airport.code}
                    onClick={() => selectAirport('origin', airport)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <span className="font-semibold">{airport.code}</span>
                    <span className="text-gray-600">{airport.city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="relative">
              <input
                type="text"
                value={searchParams.destination}
                onChange={(e) => {
                  setSearchParams(prev => ({ ...prev, destination: e.target.value.toUpperCase() }));
                  handleAirportInput('destination', e.target.value);
                }}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Airport or City"
              />
              <Plane className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transform rotate-90" />
            </div>
            {suggestions.destination.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                {suggestions.destination.map(airport => (
                  <button
                    key={airport.code}
                    onClick={() => selectAirport('destination', airport)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  >
                    <span className="font-semibold">{airport.code}</span>
                    <span className="text-gray-600">{airport.city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
              <div className="relative">
                <input
                  type="date"
                  value={searchParams.departureDate}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {searchParams.tripType === 'roundtrip' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                <div className="relative">
                  <input
                    type="date"
                    value={searchParams.returnDate}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min={searchParams.departureDate || new Date().toISOString().split('T')[0]}
                  />
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
            <div className="relative">
              <button
                onClick={() => setShowFilters(prev => !prev)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {searchParams.adults + searchParams.children + searchParams.infants} Passengers
              </button>
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Passenger Selection Dropdown */}
        {showFilters && (
          <div className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-4 mt-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Adults</div>
                  <div className="text-sm text-gray-500">12+ years</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{searchParams.adults}</span>
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-gray-500">2-11 years</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{searchParams.children}</span>
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, children: prev.children + 1 }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-gray-500">0-2 years</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, infants: Math.max(0, prev.infants - 1) }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span>{searchParams.infants}</span>
                  <button
                    onClick={() => setSearchParams(prev => ({ ...prev, infants: prev.infants + 1 }))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowFilters(false)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>

      {/* Filters */}
      {flights.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            <button
              onClick={() => setFilters({
                maxPrice: '',
                airlines: [],
                stops: 'any',
                duration: 'any'
              })}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stops</label>
              <select
                value={filters.stops}
                onChange={(e) => setFilters(prev => ({ ...prev, stops: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="any">Any</option>
                <option value="direct">Direct</option>
                <option value="1stop">1 Stop</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={filters.duration}
                onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="any">Any</option>
                <option value="short">Shortest</option>
                <option value="long">Longest</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Searching for the best flights...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {filteredFlights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Found {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''}
          </h2>
          
          {filteredFlights.map((flight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flight.itineraries.map((itinerary, itinIndex) => (
                      <div key={itinIndex} className="border-r border-gray-200 pr-6 last:border-r-0">
                        <h3 className="font-semibold text-gray-800 mb-4">
                          {itinIndex === 0 ? 'Outbound' : 'Return'} Flight
                        </h3>
                        {itinerary.segments.map((segment, segIndex) => (
                          <div key={segIndex} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">
                                  {formatTime(segment.departure.at)}
                                </div>
                                <div className="text-sm text-gray-600">{segment.departure.iataCode}</div>
                              </div>
                              
                              <div className="flex-1 px-4">
                                <div className="flex items-center justify-center">
                                  <div className="h-px bg-gray-300 flex-1"></div>
                                  <Plane className="mx-2 h-4 w-4 text-gray-400 transform rotate-90" />
                                  <div className="h-px bg-gray-300 flex-1"></div>
                                </div>
                                <div className="text-center text-xs text-gray-500 mt-1">
                                  {segment.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">
                                  {formatTime(segment.arrival.at)}
                                </div>
                                <div className="text-sm text-gray-600">{segment.arrival.iataCode}</div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500 mt-2">
                              {segment.carrierCode} {segment.number} • {segment.aircraft.code}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:text-right w-full md:w-auto">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹{flight.price.total}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    per person
                  </div>
                  <button 
                    onClick={() => toast.success('Flight selected!')}
                    className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Select Flight
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{flight.numberOfBookableSeats} seats left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Book by {formatDate(flight.lastTicketingDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && flights.length === 0 && !error && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">✈️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Fly?</h3>
          <p className="text-gray-600 mb-6">
            Enter your travel details above to find the perfect flight for your journey.
          </p>
        </div>
      )}
    </div>
  );
}

export default FlightSearch;