"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationCard from "../DestinationCard/destinationcard";

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/c/b549-fc13-48b5-9b9d")
      .then((res) => res.json())
      .then((data) => {
        const allDestinations = Array.isArray(data) ? data : data.destinations || data;
        const firstSix = allDestinations.slice(0, 6);
        setDestinations(firstSix);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured destinations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked destinations perfect for your next adventure</p>
          </div>

          <Link href="/pages/destination" className="flex items-center font-medium text-wanderwise-primary hover:text-wanderwise-secondary transition-colors">
            View all destinations
            <ChevronRight className="ml-1 w-5 h-5" />
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
                index={index} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
