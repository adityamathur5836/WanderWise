"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import DestinationCard from "../../components/DestinationCardcard";
import { allDestinations } from "../../lib/data";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";

const DestinationsPage = () => {
  const searchParams = useSearchParams(); 
  const searchQuery = searchParams.get("search") || "";
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [query, setQuery] = useState(searchQuery);

  // Initialize filtered destinations
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    if (searchQuery) {
      setQuery(searchQuery);
      filterDestinations(searchQuery);
    } else {
      setFilteredDestinations(allDestinations);
    }
  }, [searchQuery]);

  // Filter destinations based on search query
  const filterDestinations = (query) => {
    const lowercasedQuery = query.toLowerCase();
    
    // If empty query, show all
    if (!lowercasedQuery.trim()) {
      setFilteredDestinations(allDestinations);
      return;
    }
    
    // Filter by name, country or description
    const filtered = allDestinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(lowercasedQuery) ||
        destination.country.toLowerCase().includes(lowercasedQuery) ||
        destination.description.toLowerCase().includes(lowercasedQuery)
    );
    
    setFilteredDestinations(filtered);
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    filterDestinations(query);
  };

  return (
    <div className="pt-20">
      <Navbar />
      {/* Hero section */}
      <div className="bg-wanderwise-light-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover amazing places around the world and start planning your next unforgettable journey
          </p>
          
          {/* Search form */}
          <form onSubmit={handleSearch} className="search-bar mx-auto">
            <div className="relative flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, countries, or experiences..."
                className="w-full py-4 px-6 pr-12 rounded-full shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-wanderwise-primary"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-wanderwise-primary text-white p-3 rounded-full bg-blue-600 transition-colors cursor-pointer hover:bg-blue-900"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Destinations grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No destinations found</h2>
            <p className="text-gray-600">
              Try adjusting your search or explore our featured destinations.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DestinationsPage;