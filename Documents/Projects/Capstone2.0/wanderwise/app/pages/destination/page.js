"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, MapPin } from "lucide-react";
import DestinationCard from "../../components/DestinationCard/destinationcard";
import { allDestinations } from "../../lib/data";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";
import Image from "next/image";

const DestinationsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (searchQuery) {
      setQuery(searchQuery);
      filterDestinations(searchQuery);
    } else {
      setFilteredDestinations(allDestinations);
    }
  }, [searchQuery]);

  const filterDestinations = (query) => {
    const lowercasedQuery = query.toLowerCase();
    if (!lowercasedQuery.trim()) {
      setFilteredDestinations(allDestinations);
      return;
    }
    const filtered = allDestinations.filter((destination) =>
      destination.name.toLowerCase().includes(lowercasedQuery) ||
      destination.country.toLowerCase().includes(lowercasedQuery) ||
      destination.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredDestinations(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterDestinations(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <Navbar />
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=7360&q=80"
            alt="Beautiful landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-wanderwise-primary/20 to-wanderwise-secondary/20"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pt-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
              Discover Your Next
              <span className="block text-wanderwise-secondary">Adventure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed drop-shadow-md">
              From pristine beaches to majestic mountains, explore handpicked destinations that will create memories to last a lifetime
            </p>

            <form onSubmit={handleSearch} className="search-bar mx-auto mb-8">
              <div className="relative flex max-w-4xl mx-auto">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations, countries, or experiences..."
                  className="w-full py-5 pl-16 pr-32 rounded-full shadow-2xl text-gray-700 focus:outline-none focus:ring-4 focus:ring-wanderwise-primary/30 backdrop-blur-sm bg-white/95 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-wanderwise-primary to-blue-600 text-black px-8 py-3 rounded-full hover:from-blue-600 hover:to-wanderwise-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label="Search"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-white mb-2">{allDestinations.length}+</div>
                <div className="text-gray-300">Destinations</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-gray-300">Happy Travelers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {query ? `Search Results for "${query}"` : "All Destinations"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{filteredDestinations.length} destinations found</span>
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <span className="text-sm text-gray-600">Showing {filteredDestinations.length} results</span>
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wanderwise-primary">
                <option>Sort by Popularity</option>
                <option>Sort by Rating</option>
                <option>Sort by Name</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDestinations.map((destination, index) => (
                <div key={destination.id}>
                  <DestinationCard destination={destination} index={index} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">🗺️</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">No destinations found</h2>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or explore our featured destinations.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilteredDestinations(allDestinations);
                }}
                className="bg-wanderwise-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show All Destinations
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DestinationsPage;
