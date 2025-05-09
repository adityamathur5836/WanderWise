// import React from 'react';
// import {  MapPin, Star } from 'lucide-react';
// import Link from "next/link";


// const destinations = [
//   {
//     id: 1,
//     name: 'Bali, Indonesia',
//     image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     rating: 4.8,
//     reviews: 1243,
//     description: 'Island paradise with stunning beaches, vibrant culture and lush landscapes.'
//   },
//   {
//     id: 2,
//     name: 'Paris, France',
//     image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     rating: 4.7,
//     reviews: 2150,
//     description: 'The city of lights famous for the Eiffel Tower, art museums and fine cuisine.'
//   },
//   {
//     id: 3,
//     name: 'Santorini, Greece',
//     image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     rating: 4.9,
//     reviews: 1867,
//     description: 'Iconic white and blue buildings perched on cliffs overlooking the Aegean Sea.'
//   },
//   {
//     id: 4,
//     name: 'New York City, USA',
//     image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//     rating: 4.6,
//     reviews: 3240,
//     description: 'The Big Apple with iconic skyscrapers, Central Park and Broadway shows.'
//   }
// ];

// const FeaturedDestinations = () => {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-2">Featured Destinations</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Explore our hand-picked selection of stunning destinations from around the world
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {destinations.map((destination) => (
//             <div 
//               key={destination.id}
//               className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
//             >
//               <div className="relative h-48">
//                 <img 
//                   src={destination.image} 
//                   alt={destination.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center">
//                   <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
//                   {destination.rating}
//                 </div>
//               </div>

//               <div className="p-5">
//                 <div className="flex items-center text-gray-500 mb-2">
//                   <MapPin className="h-4 w-4 mr-1" />
//                   <span className="text-sm">{destination.name}</span>
//                 </div>
//                 <h3 className="font-bold text-lg mb-2">{destination.name}</h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {destination.description}
//                 </p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-gray-500">{destination.reviews} reviews</span>
//                   <Link href='/' variant="outline" size="sm" className="text-primary hover:bg-primary/10">
//                     Explore
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <button className="bg-primary hover:bg-primary/90">
//             View All Destinations
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedDestinations;
"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DestinationCard from "../DestinationCard/destinationcard";
import { featuredDestinations } from "../../lib/data";

const FeaturedDestinations = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <div className="animate-on-scroll mb-4 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">Featured Destinations</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked destinations perfect for your next adventure</p>
          </div>

          <Link href="/destinations" className="flex items-center font-medium text-wanderwise-primary hover:text-wanderwise-secondary transition-colors animate-on-scroll">
            View all destinations
            <ChevronRight className="ml-1 w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((destination, index) => (
            <div key={destination.id} className="animate-on-scroll">
              <DestinationCard destination={destination} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
