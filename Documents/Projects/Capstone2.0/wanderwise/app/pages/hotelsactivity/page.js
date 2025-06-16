"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Heart } from "lucide-react";
import { allDestinations, hotels, activities } from "../../lib/data";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "../../lib/localStorage";
import { toast } from "../../components/ui/sonner";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

const HotelsActivitiesPage = () => {
  const [activeTab, setActiveTab] = useState("hotel");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [amadeusHotels, setAmadeusHotels] = useState([]);
  const [amadeusLoading, setAmadeusLoading] = useState(false);
  const [amadeusError, setAmadeusError] = useState(null);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesDestination = selectedDestination === "all" || hotel.destinationId === selectedDestination;
    const matchesSearch = !searchQuery ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDestination && matchesSearch;
  });

  const filteredActivities = activities.filter((activity) => {
    const matchesDestination = selectedDestination === "all" || activity.destinationId === selectedDestination;
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter;
    const matchesSearch = !searchQuery ||
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDestination && matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setAmadeusLoading(true);
    fetch("/api/amadeus-hotels")
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        const hotelsFromAmadeus = (data.data || []).map((item) => ({
          id: item.hotel.hotelId,
          name: item.hotel.name,
          image: item.hotel.media && item.hotel.media[0] ? item.hotel.media[0].uri : "/placeholder.jpg",
          description: item.hotel.description?.text || "No description available.",
          rating: item.hotel.rating || 0,
          amenities: item.hotel.amenities || [],
          pricePerNight: item.offers && item.offers[0] ? item.offers[0].price.total : null,
          destinationId: null, // Amadeus hotels may not have this, so set to null
          isAmadeus: true,
        }));
        setAmadeusHotels(hotelsFromAmadeus);
        setAmadeusLoading(false);
      })
      .catch((err) => {
        setAmadeusError("Failed to load Amadeus hotels");
        setAmadeusLoading(false);
      });
  }, []);

  const toggleFavorite = (type, item) => {
    const key = `${type}-${item.id}`;
    const isFavorite = favoriteStatus[key];

    if (isFavorite) {
      removeFromFavorites(type, item.id);
      toast.success(`Removed from favorites`);
    } else {
      saveToFavorites(type, item);
      toast.success(`Added to favorites`);
    }

    setFavoriteStatus({
      ...favoriteStatus,
      [key]: !isFavorite,
    });
  };

  const allHotelsCombined = [...hotels, ...amadeusHotels];
  const filteredHotelsCombined = allHotelsCombined.filter((hotel) => {
    const matchesDestination = selectedDestination === "all" || hotel.destinationId === selectedDestination;
    const matchesSearch = !searchQuery ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDestination && matchesSearch;
  });

  return (
    <div className="pt-20 bg-blue-50">
        <Navbar />
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
            {activeTab === "hotel" ? "Hotels & Accommodations" : "Activities & Experiences"}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex space-x-2 animate-fade-in">
              <button
                onClick={() => setActiveTab("hotel")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "hotel"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Hotels
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "activity"
                    ? "bg-white text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                Activities
              </button>
            </div>

            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === "hotel" ? "hotels" : "activities"}...`}
                className="w-full py-2 px-4 pr-10 rounded-full shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-wanderwise-primary bg-white"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 animate-fade-in">
            <div className="w-full md:w-1/3 xl:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wanderwise-primary"
              >
                <option value="all">All Destinations</option>
                {allDestinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}, {destination.country}
                  </option>
                ))}
              </select>
            </div>

            {activeTab === "activity" && (
              <div className="w-full md:w-1/3 xl:w-1/4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-wanderwise-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="adventure">Adventure</option>
                  <option value="culture">Culture</option>
                  <option value="food">Food & Drink</option>
                  <option value="nature">Nature</option>
                  <option value="relaxation">Relaxation</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === "hotel" ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              {filteredHotelsCombined.length} {filteredHotelsCombined.length === 1 ? "Hotel" : "Hotels"} Found
            </h2>
            {amadeusLoading && (
              <div className="text-center py-4 text-blue-600">Loading Amadeus hotels...</div>
            )}
            {amadeusError && (
              <div className="text-center py-4 text-red-600">{amadeusError}</div>
            )}
            {filteredHotelsCombined.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotelsCombined.map((hotel) => {
                  const destination = allDestinations.find(d => d.id === hotel.destinationId);
                  const isFavorite = favoriteStatus[`hotel-${hotel.id}`] || false;
                  return (
                    <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-fade-in">
                      <div className="relative h-48">
                        <img 
                          src={hotel.image} 
                          alt={hotel.name} 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleFavorite("hotel", hotel)}
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
                        >
                          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                        </button>
                        {hotel.isAmadeus && (
                          <span className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Amadeus</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-4 h-4 text-wanderwise-secondary mr-1" />
                          {destination ? (
                            <Link 
                              href={`/destination/${destination.id}`}
                              className="text-sm text-gray-600 hover:text-wanderwise-secondary"
                            >
                              {destination.name}, {destination.country}
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-500">Unknown Destination</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{hotel.rating}/5</span>
                          <span className="mx-2">•</span>
                          <span>{hotel.amenities?.slice(0, 1).join(", ")} & more</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-wanderwise-primary">
                              {hotel.pricePerNight ? `$${hotel.pricePerNight}` : "-"}
                            </span>
                            <span className="text-sm text-gray-500"> / night</span>
                          </div>
                          <Link
                            href={hotel.isAmadeus ? "#" : `/hotel/${hotel.id}`}
                            className="bg-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition-colors text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-medium text-gray-700">No hotels match your search criteria</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              {filteredActivities.length} {filteredActivities.length === 1 ? "Activity" : "Activities"} Found
            </h2>
            {filteredActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity) => {
                  const destination = allDestinations.find(d => d.id === activity.destinationId);
                  const isFavorite = favoriteStatus[`activity-${activity.id}`] || false;

                  return (
                    <Link
                      key={activity.id}
                      href={`/activity/${activity.id}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-fade-in"
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite("activity", activity);
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors z-10"
                        >
                          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <MapPin className="w-4 h-4 text-wanderwise-secondary mr-1" />
                          <Link 
                            href={`/destination/${destination?.id}`}
                            className="text-sm text-gray-600 hover:text-wanderwise-secondary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {destination?.name}, {destination?.country}
                          </Link>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{activity.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{activity.rating}/5</span>
                          <span className="mx-2">•</span>
                          <span>{activity.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-lg font-bold text-wanderwise-primary">
                              ${activity.price}
                            </span>
                            <span className="text-sm text-gray-500"> per person</span>
                          </div>
                          <div className="bg-wanderwise-secondary text-white px-3 py-1.5 rounded text-sm">
                            Book Now
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-medium text-gray-700">No activities match your search criteria</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HotelsActivitiesPage;