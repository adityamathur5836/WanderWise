"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Clock, MapPin, Heart, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getDestinationById, getHotelsByDestination, getActivitiesByDestination } from "../../lib/data";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "../../lib/localStorage";
import { toast } from "../../components/ui/sonner";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

export default function DestinationDetailPage() {
  const params = useParams();
  const id = params.id;
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const destinationId = Number(id);
      
      // Get destination data
      const destinationData = getDestinationById(destinationId);
      const hotelsData = getHotelsByDestination(destinationId);
      const activitiesData = getActivitiesByDestination(destinationId);
      
      setDestination(destinationData);
      setHotels(hotelsData);
      setActivities(activitiesData);
      setLoading(false);
      
      // Scroll to top when page loads
      window.scrollTo(0, 0);
      
      // Check if destination is in favorites
      if (destinationData) {
        setFavorite(isInFavorites("destinations", destinationData.id));
      }
    }
  }, [id]);

  // Carousel navigation functions
  const nextImage = () => {
    if (!destination?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === destination.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!destination?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? destination.images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!destination?.images) return;
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [destination]);

  // Handle favorite toggle
  const toggleFavorite = () => {
    if (!destination) return;
    
    if (favorite) {
      removeFromFavorites("destinations", destination.id);
      toast.success("Removed from favorites");
    } else {
      saveToFavorites("destinations", destination);
      toast.success("Added to favorites");
    }
    
    setFavorite(!favorite);
  };

  // Loading state
  if (loading) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Not found state
  if (!destination) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Destination not found
        </h1>
        <Link 
          href="/destination" 
          className="text-wanderwise-primary hover:text-wanderwise-secondary transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-16">
        {/* Hero section with carousel */}
        <div className="relative h-[60vh] min-h-[400px]">
          {/* Carousel images */}
          <div className="relative w-full h-full">
            {destination?.images?.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${destination.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Carousel navigation buttons */}
          {destination?.images && destination.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {destination.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto px-4">
              <Link 
                href="/destination" 
                className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All destinations
              </Link>
              
              <div className="flex justify-between items-end">
                <div className="animate-fade-in">
                  <h1 className="text-4xl font-bold mb-1">{destination.name}</h1>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-wanderwise-secondary mr-1" />
                    <span>{destination.country}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="flex items-center bg-wanderwise-secondary text-white px-2 py-1 rounded mr-3">
                      <Star className="w-4 h-4 mr-1" fill="white" />
                      {destination.rating}
                    </span>
                    <span className="mr-3">Price Level: {destination.priceLevel}</span>
                  </div>
                </div>
                
                <button 
                  onClick={toggleFavorite}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all px-4 py-2 rounded-full animate-fade-in"
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-red-500 text-red-500" : "text-white"}`} />
                  <span>{favorite ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-wanderwise-primary text-wanderwise-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("hotels")}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "hotels"
                    ? "border-wanderwise-primary text-wanderwise-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Hotels
              </button>
              <button
                onClick={() => setActiveTab("activities")}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "activities"
                    ? "border-wanderwise-primary text-wanderwise-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Activities
              </button>
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <div className="container mx-auto px-4 py-8">
          {/* Overview tab */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {destination.description}
                </p>

                <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                <p className="text-gray-700 mb-6">
                  The ideal time to visit {destination.name} is during the shoulder seasons of April-May and September-October when the weather is pleasant and crowds are smaller than the peak summer months.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Local Tips</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Learn a few basic phrases in the local language</li>
                      <li>• Respect local customs and dress codes</li>
                      <li>• Try local street food for authentic flavors</li>
                      <li>• Use public transportation when possible</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3">Getting Around</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Public transportation is efficient and affordable</li>
                      <li>• Taxis are readily available but agree on price first</li>
                      <li>• Walking is the best way to explore the city center</li>
                      <li>• Consider renting a bike for longer distances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hotels tab */}
          {activeTab === "hotels" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-wanderwise-primary font-medium">
                          ${hotel.pricePerNight}/night
                        </span>
                        <span className="flex items-center text-sm">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                          {hotel.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activities tab */}
          {activeTab === "activities" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{activity.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-wanderwise-primary font-medium">
                          ${activity.price}
                        </span>
                        <span className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 