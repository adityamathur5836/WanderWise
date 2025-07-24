"use client";
import React, { useEffect, useState, useMemo } from "react";
import Footer from "@/app/components/Footer/footer";
import Navbar from "@/app/components/Navbar/navbar_new";

const PAGE_SIZE = 9;

export default function HotelsActivityPage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("https://dummyjson.com/c/9794-cd1d-449d-98d7");
        if (!res.ok) throw new Error("Failed to fetch hotels");

        const data = await res.json();
        const newHotels = Array.isArray(data.hotels)
          ? data.hotels
          : Array.isArray(data)
          ? data
          : [];

        setHotels(newHotels);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Reset to first page on sort change
  useEffect(() => {
    setPage(0);
  }, [sortBy]);

  // Memoized sorted hotels
  const sortedHotels = useMemo(() => {
    const sorted = [...hotels];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "country":
        return sorted.sort((a, b) =>
          (a.country || "").localeCompare(b.country || "")
        );
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "price":
        return sorted.sort(
          (a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0)
        );
      default:
        return sorted;
    }
  }, [hotels, sortBy]);

  const totalPages = Math.ceil(sortedHotels.length / PAGE_SIZE);
  const visibleHotels = sortedHotels.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh]">
          <img
            src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
            alt="Hotel Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-up leading-tight">
              Discover Your Perfect Stay
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl animate-fade-up delay-150 leading-relaxed">
              Explore our hand-picked hotels across India's top destinations
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="name">Sort by Name</option>
                <option value="country">Sort by Country</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            <div className="text-gray-700 font-medium text-sm sm:text-base">
              {sortedHotels.length} hotels found
            </div>
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {visibleHotels.map((hotel, idx) => (
              <div
                key={hotel.id}
                className="group animate-fade-in rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <div className="flex justify-between items-end">
                      <h3 className="text-sm sm:text-base font-bold bg-black/50 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full truncate max-w-[70%]">
                        {hotel.name}
                      </h3>
                      <span className="bg-white/30 backdrop-blur-sm text-xs sm:text-sm px-2 py-1 rounded-full font-medium flex-shrink-0">
                        {hotel.rating} ★
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>
                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg sm:text-xl font-bold text-gray-900">
                        ₹{hotel.pricePerNight || "5000"}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-1">per night</span>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6">
                    <a
                      href={`/pages/hotel/${hotel.id}`}
                      className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition-all duration-200 text-sm sm:text-base hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex justify-center items-center space-x-1 sm:space-x-2 flex-wrap gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx)}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base font-medium ${
                    idx === page
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages - 1}
                onClick={() => setPage(page + 1)}
                className="px-3 sm:px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading amazing hotels...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 sm:px-6 py-4 sm:py-6 rounded-lg max-w-md w-full text-center">
                <h3 className="font-semibold text-sm sm:text-base mb-2">Oops! Something went wrong</h3>
                <p className="text-sm sm:text-base mb-4">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
