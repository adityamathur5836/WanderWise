"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationCard from "../DestinationCard/destinationcard";
import { featuredDestinations } from "../../lib/data";

const FeaturedDestinations = () => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id} 
              destination={destination} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;