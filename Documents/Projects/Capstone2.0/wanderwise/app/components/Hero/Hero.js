"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Add animation delay after component mounts
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/pages/destination?search=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
          alt="Travel inspiration"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div 
          className={`max-w-3xl mx-auto transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Plan your dream trip with WanderWise
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover amazing destinations, find the perfect stay, and create unforgettable memories
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-bar mb-12">
            <div className="relative flex">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Where would you like to go?"
                className="w-full py-4 px-6 pr-12 rounded-full shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-wanderwise-secondary bg-white"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-wanderwise-secondary text-white p-3 rounded-full bg-orange-500 transition-colors cursor-pointer hover:bg-green-500"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
              <span className="mr-2">✓</span> 1000+ destinations
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
              <span className="mr-2">✓</span> Best price guarantee
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
              <span className="mr-2">✓</span> Free cancellation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
