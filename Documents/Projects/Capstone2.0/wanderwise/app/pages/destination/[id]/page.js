"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar/navbar_new";
import Footer from "../../../components/Footer/footer";
import { getDestinationById, getHotelsByDestination, getActivitiesByDestination } from "../../../lib/data";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DestinationDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!id) return;
  
    const destId = Number(id);
  
    fetch("https://dummyjson.com/c/b549-fc13-48b5-9b9d")
      .then((res) => res.json())
      .then((data) => {
        // Assume the response contains allDestinations, hotels, and activities
        const destinations = Array.isArray(data.allDestinations) ? data.allDestinations : data;
        const hotels = Array.isArray(data.hotels) ? data.hotels : data;
        const activities = Array.isArray(data.activities) ? data.activities : data;
  
        const destination = destinations.find((d) => d.id === destId);
        const filteredHotels = hotels.filter((h) => h.destinationId === destId);
        const filteredActivities = activities.filter((a) => a.destinationId === destId);
  
        setDestination(destination || null);
        setHotels(filteredHotels);
        setActivities(filteredActivities);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  const nextImage = () => {
    if (!destination?.images) return;
    setCurrentImage((prev) =>
      prev === destination.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!destination?.images) return;
    setCurrentImage((prev) =>
      prev === 0 ? destination.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-blue-50 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/pages/destination" className="text-blue-600 hover:text-blue-800">
            Return to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 2) {
                router.back();
              } else {
                router.push("/pages/destination");
              }
            }}
            className="text-black hover:text-blue-800 font-extrabold"
          >
            ← Back to Destinations
          </button>
        </div>

        {/* Destination Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{destination.name}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {destination.country}
              </div>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="text-lg font-medium">{destination.rating}</span>
                </div>
                <div className="text-gray-700 font-medium">
                  {destination.priceLevel || '₹'}
                </div>
                {destination.isTrending && (
                  <span className="bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1 rounded ml-2">
                    Trending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        {destination.images && destination.images.length > 0 && (
          <div className="relative h-[500px] mb-8 rounded-lg overflow-hidden">
            {destination.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${destination.name} - Image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Destination Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
          <p className="text-gray-600 mb-6">{destination.description}</p>
        </div>
      </div>
      {/* Hotels Section */}
      <div className="container mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold mb-4">Hotels in {destination.name}</h2>
        {hotels.length === 0 ? (
          <p className="text-gray-500 mb-8">No hotels found for this destination.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {hotels.map(hotel => (
              <Link key={hotel.id} href={`/pages/hotel/${hotel.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all block">
                <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{hotel.rating}/5</span>
                  </div>
                  <div className="text-gray-700 font-bold mb-2">
                    ₹{hotel.pricePerNight.toLocaleString()} <span className="text-sm font-normal text-gray-500">/ night</span>
                  </div>
                  <span className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">View Details</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Activities Section */}
      <div className="container mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold mb-4">Activities in {destination.name}</h2>
        {activities.length === 0 ? (
          <p className="text-gray-500 mb-8">No activities found for this destination.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {activities.map(activity => (
              <div key={activity.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
                <img src={activity.image} alt={activity.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{activity.rating}/5</span>
                  </div>
                  <div className="text-gray-700 font-bold mb-2">
                    ₹{activity.price.toLocaleString()} <span className="text-sm font-normal text-gray-500">per person</span>
                  </div>
                  <a href={`/activity/${activity.id}`} className="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">View Details</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 