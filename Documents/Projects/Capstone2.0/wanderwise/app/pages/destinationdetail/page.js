"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Clock, MapPin, Heart, ArrowLeft } from "lucide-react";
import { getDestinationById, getHotelsByDestination, getActivitiesByDestination } from "@/lib/data";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "@/lib/localStorage";
import { toast } from "@/components/ui/sonner";

const DestinationDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const destination = id ? getDestinationById(Number(id)) : undefined;
  const hotels = id ? getHotelsByDestination(Number(id)) : [];
  const activities = id ? getActivitiesByDestination(Number(id)) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (destination) {
      setFavorite(isInFavorites("destination", destination.id));
    }
  }, [destination]);

  const toggleFavorite = () => {
    if (!destination) return;

    if (favorite) {
      removeFromFavorites("destination", destination.id);
      toast.success("Removed from favorites");
    } else {
      saveToFavorites("destination", destination);
      toast.success("Added to favorites");
    }

    setFavorite(!favorite);
  };

  if (!destination) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
        <Link
          href="/destinations"
          className="text-wanderwise-primary hover:text-wanderwise-secondary transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto px-4">
            <Link
              href="/destinations"
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

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {["overview", "hotels", "activities"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-wanderwise-primary text-wanderwise-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <div className="animate-fade-in max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {destination.description}
              {destination.name === "Santorini" && (
                <>
                  <br />
                  <br />
                  Perched on the edge of a submerged volcano, Santorini is renowned for its dramatic views...
                </>
              )}
            </p>
            {/* Tips and Packing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Local Tips</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Try the local cuisine at family-run tavernas</li>
                  <li>Visit markets in the morning for the freshest produce</li>
                  <li>Learn a few phrases in the local language</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">What to Pack</h3>
                <ul className="space-y-2 text-gray-700 list-disc list-inside">
                  <li>Comfortable walking shoes</li>
                  <li>Weather-appropriate clothing</li>
                  <li>Travel adapter and essentials</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hotels" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Where to Stay in {destination.name}</h2>
            {hotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>
                      <span className="text-lg font-bold text-wanderwise-primary">${hotel.pricePerNight}</span>
                      <span className="text-sm text-gray-500"> / night</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No hotels found for this destination yet.</p>
            )}
          </div>
        )}

        {activeTab === "activities" && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Things to Do in {destination.name}</h2>
            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <img src={activity.image} alt={activity.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                      <span className="text-lg font-bold text-wanderwise-primary">${activity.price}</span>
                      <span className="text-sm text-gray-500"> per person</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No activities found for this destination yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetailPage;
