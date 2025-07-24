"use client";
import React, { useEffect, useState, useMemo } from "react";
import Footer from "@/app/components/Footer/footer";
import Navbar from "@/app/components/Navbar/navbar";

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
    <div className="bg-gray-50">
      <Navbar />
      <div className="mx-auto mt-18 px-4">
        {/* Hero Section */}
        <div className="relative h-[60vh]">
          <img
            src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
            alt="Hotel Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">
              Discover Your Perfect Stay
            </h1>
            <p className="text-lg md:text-xl max-w-2xl animate-fade-up delay-150">
              Explore our hand-picked hotels across India's top destinations
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white rounded-2xl p-6 shadow">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-300"
            >
              <option value="name">Sort by Name</option>
              <option value="country">Sort by Country</option>
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
            </select>
            <div className="text-gray-700 font-medium">
              {sortedHotels.length} destinations found
            </div>
          </div>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-80">
          {visibleHotels.map((hotel, idx) => (
            <div
              key={hotel.id}
              className="group animate-fade-in rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="relative w-full aspect-[4/3]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-end">
                  <h3 className="text-sm font-bold bg-black/50 px-3 py-1 rounded-full">
                    {hotel.name}
                  </h3>
                  <span className="bg-white/30 text-xs px-2 py-1 rounded-full">
                    {hotel.rating} ★
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="mt-2 text-gray-600 line-clamp-2">
                  {hotel.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{hotel.pricePerNight || "5000"}
                  </span>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
                <div className="mt-6">
                  <a
                    href={`/pages/hotel/${hotel.id}`}
                    className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2 flex-wrap mb-10">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`px-3 py-1 rounded ${
                  idx === page
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
              <p>Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
