"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Wifi, Coffee, Waves, Car, Droplets } from "lucide-react";
import { hotels, getDestinationById } from "../../lib/data";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "../../lib/localStorage";
import { toast } from "../../components/ui/sonner";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

export default function HotelDetailPage() {
  const params = useParams();
  const id = params.id;
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [destination, setDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const hotelId = Number(id);
      
      // Get hotel data
      const hotelData = hotels.find(h => h.id === hotelId);
      if (hotelData) {
        setHotel(hotelData);
        const destinationData = getDestinationById(hotelData.destinationId);
        setDestination(destinationData);
        setFavorite(isInFavorites("hotel", hotelData.id));
      }
      setLoading(false);
      
      // Scroll to top when page loads
      window.scrollTo(0, 0);
    }
  }, [id]);

  // Carousel navigation functions
  const nextImage = () => {
    if (!hotel?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!hotel?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites("hotel", hotel.id);
      toast.success("Removed from favorites");
    } else {
      saveToFavorites("hotel", hotel);
      toast.success("Added to favorites");
    }
    setFavorite(!favorite);
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

  if (!hotel) {
    return (
      <div className="min-h-screen bg-blue-50 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Hotel not found</h1>
          <Link href="/pages/hotelsactivity" className="text-blue-600 hover:text-blue-800">
            Return to Hotels
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
          <Link href="/pages/hotelsactivity" className="text-blue-600 hover:text-blue-800">
            ← Back to Hotels
          </Link>
        </div>

        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              {destination && (
                <Link 
                  href={`/destination/${destination.id}`}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  {destination.name}, {destination.country}
                </Link>
              )}
            </div>
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart className={`w-6 h-6 ${favorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>
          <div className="flex items-center mt-4">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-lg font-medium">{hotel.rating}</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600">${hotel.pricePerNight} per night</span>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative h-[500px] mb-8 rounded-lg overflow-hidden">
          {hotel.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${hotel.name} - Image ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
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

        {/* Hotel Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
              <p className="text-gray-600 mb-6">{hotel.description}</p>
              
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    {amenity === "Free WiFi" && <Wifi className="w-5 h-5 mr-2" />}
                    {amenity === "Breakfast" && <Coffee className="w-5 h-5 mr-2" />}
                    {amenity === "Private Pool" && <Waves className="w-5 h-5 mr-2" />}
                    {amenity === "Airport Shuttle" && <Car className="w-5 h-5 mr-2" />}
                    {amenity === "Spa" && <Droplets className="w-5 h-5 mr-2" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ${hotel.pricePerNight}
                  <span className="text-base font-normal text-gray-600"> / night</span>
                </div>
                <div className="text-sm text-gray-600">
                  Includes taxes and fees
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Book Now
              </button>
              <div className="mt-4 text-center text-sm text-gray-600">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 