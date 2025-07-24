"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from 'lucide-react';
import Navbar from "../../components/Navbar/navbar_new";
import DestinationCard from "../../components/DestinationCard/destinationcard.jsx";
import Image from "next/image";
import Footer from "@/app/components/Footer/footer";

const PAGE_SIZE = 9;

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(0);

  // Fetch hotels from dummyjson API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/c/b549-fc13-48b5-9b9d");
        const data = await response.json();
        setDestinations(data);
        console.log(data)
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Filter & sort logic
  const filteredDestinations = useMemo(() => {
    let filtered = destinations;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(q) || dest.location?.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'country':
        filtered.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
    }

    return filtered;
  }, [destinations, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredDestinations.length / PAGE_SIZE);
  const visibleDestinations = filteredDestinations.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-cover bg-center overflow-hidden mt-18">
        <Image
          src="https://images.unsplash.com/photo-1752503650851-cbc3f8b00679?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D"
          alt="Travel Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-20" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Your Next <span className="text-blue-400 block">Adventure</span></h1>
          <p className="text-xl mb-6">Explore curated cities from around the world</p>
          <div className="w-full max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="bg-white w-full py-3 pl-12 pr-4 rounded-full text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            {filteredDestinations.length} destinations found
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : filteredDestinations.length === 0 ? (
          <div className="text-center text-gray-500">No destinations found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {visibleDestinations.map((dest, idx) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  index={idx}
                />
              ))}
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200 ${
                      idx === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
