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
    <div className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
          alt="Travel inspiration"
          className="w-full h-full object-cover object-center"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="container-responsive z-10 text-center">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="responsive-text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Plan your dream trip with WanderWise
          </h1>
          <p className="responsive-text-lg text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover amazing destinations, find the perfect stay, and create unforgettable memories
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-bar mb-8 sm:mb-12">
            <div className="relative flex max-w-lg mx-auto">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Where would you like to go?"
                className="w-full py-3 sm:py-4 px-4 sm:px-6 pr-12 sm:pr-14 rounded-full shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-wanderwise-secondary bg-white text-sm sm:text-base"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bg-orange-500 text-white p-2 sm:p-3 rounded-full transition-colors cursor-pointer hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-2 sm:px-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm">
              <span className="mr-1 sm:mr-2">✓</span>
              <span className="hidden xs:inline">1000+ destinations</span>
              <span className="xs:hidden">1000+ places</span>
            </span>
            <span className="inline-flex items-center px-3 py-2 sm:px-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm">
              <span className="mr-1 sm:mr-2">✓</span>
              <span className="hidden xs:inline">Best price guarantee</span>
              <span className="xs:hidden">Best prices</span>
            </span>
            <span className="inline-flex items-center px-3 py-2 sm:px-4 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm">
              <span className="mr-1 sm:mr-2">✓</span>
              <span className="hidden xs:inline">Free cancellation</span>
              <span className="xs:hidden">Free cancel</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
