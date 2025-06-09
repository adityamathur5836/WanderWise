"use client";

import { useState, useEffect } from "react";
import  Link  from "next/link";
import { Trash2, MapPin, Star, X } from "lucide-react";
import { getFavorites, removeFromFavorites } from "../../lib/localStorage";
import { allDestinations } from "../../lib/data";
import { toast } from "../../components/ui/sonner";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/navbar";

const FavoritesPage = () => {
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [activeTab, setActiveTab] = useState("destinations");

  useEffect(() => {
    window.scrollTo(0, 0);
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavoriteDestinations(getFavorites("destinations"));
    setFavoriteHotels(getFavorites("hotel"));
    setFavoriteActivities(getFavorites("activity"));
  };

  const removeItem = (type, itemId) => {
    removeFromFavorites(type, itemId);

    switch (type) {
      case "destinations":
        setFavoriteDestinations(favoriteDestinations.filter(item => item.id !== itemId));
        break;
      case "hotel":
        setFavoriteHotels(favoriteHotels.filter(item => item.id !== itemId));
        break;
      case "activity":
        setFavoriteActivities(favoriteActivities.filter(item => item.id !== itemId));
        break;
    }

    toast.success("Removed from favorites");
  };

  const isFavoritesEmpty =
    favoriteDestinations.length === 0 &&
    favoriteHotels.length === 0 &&
    favoriteActivities.length === 0;

  return (
    <div className="bg-blue-50 pt-20">
      <Navbar />
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">Your Favorites</h1>
          <p className="text-gray-700 mb-6 animate-fade-in">
            Keep track of destinations, hotels, and activities that catch your eye
          </p>

          <div className="flex space-x-2 animate-fade-in">
            {["destinations", "hotels", "activities"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-blue-700 text-white hover:bg-blue-500 cursor-pointer"
                    : "bg-blue-600 text-white hover:bg-gray-200 cursor-pointer"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                  {tab === "destinations"
                    ? favoriteDestinations.length
                    : tab === "hotels"
                    ? favoriteHotels.length
                    : favoriteActivities.length}
                )
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "destinations" && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Saved Destinations ({favoriteDestinations.length})
            </h2>
            {favoriteDestinations.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <Trash2 className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">
                  Start exploring and save destinations you love
                </p>
                <Link
                  href="/pages/destination"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Explore Destinations
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteDestinations.map(destination => (
                  <div
                    key={destination.id}
                    className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all group"
                  >
                    <Link href={`/destination/${destination.id}`}>
                      <div className="h-78 overflow-hidden">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{destination.name}</h3>
                        <p className="text-sm text-gray-200">{destination.country}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeItem("destinations", destination.id)}
                      className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors z-10"
                      aria-label="Remove from favorites"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3.5 h-3.5 mr-1 text-yellow-400 fill-yellow-400" />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "hotels" && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Saved Hotels ({favoriteHotels.length})
            </h2>
            {favoriteHotels.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <Trash2 className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">
                  Start exploring and save hotels you love
                </p>
                <Link
                  href="/pages/hotelsactivity"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Explore Hotels
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteHotels.map(hotel => {
                  const destination = allDestinations.find(d => d.id === hotel.destinationId);
                  return (
                    <div
                      key={hotel.id}
                      className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="relative h-48">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeItem("hotel", hotel.id)}
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
                          aria-label="Remove from favorites"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                      <div className="p-4">
                        {destination && (
                          <div className="flex items-center mb-2">
                            <MapPin className="w-4 h-4 text-wanderwise-secondary mr-1" />
                            <Link
                              href={`/destination/${destination.id}`}
                              className="text-sm text-gray-600 hover:text-wanderwise-secondary"
                            >
                              {destination.name}, {destination.country}
                            </Link>
                          </div>
                        )}
                        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{hotel.rating}/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-wanderwise-primary">
                              ${hotel.pricePerNight}
                            </span>
                            <span className="text-sm text-gray-500"> / night</span>
                          </div>
                          <button className="bg-wanderwise-primary text-white px-3 py-1.5 rounded hover:bg-blue-600 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === "activities" && (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Saved Activities ({favoriteActivities.length})
            </h2>
            {favoriteActivities.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <Trash2 className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-6">
                  Start exploring and save activities you love
                </p>
                <Link
                  href="/pages/hotelsactivity"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Explore Activities
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteActivities.map(activity => {
                  const destination = allDestinations.find(d => d.id === activity.destinationId);
                  return (
                    <div
                      key={activity.id}
                      className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="relative h-48">
                        <img
                          src={activity.image}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-wanderwise-secondary text-white text-xs px-2 py-1 rounded">
                          {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                        </div>
                        <button
                          onClick={() => removeItem("activity", activity.id)}
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
                          aria-label="Remove from favorites"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                      <div className="p-4">
                        {destination && (
                          <div className="flex items-center mb-2">
                            <MapPin className="w-4 h-4 text-wanderwise-secondary mr-1" />
                            <Link
                              href={`/destination/${destination.id}`}
                              className="text-sm text-gray-600 hover:text-wanderwise-secondary"
                            >
                              {destination.name}, {destination.country}
                            </Link>
                          </div>
                        )}
                        <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{activity.rating}/5</span>
                          <span className="mx-2">•</span>
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-wanderwise-primary">
                              ${activity.price}
                            </span>
                            <span className="text-sm text-gray-500"> per person</span>
                          </div>
                          <button className="bg-wanderwise-secondary text-white px-3 py-1.5 rounded hover:bg-orange-500 transition-colors text-sm">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
