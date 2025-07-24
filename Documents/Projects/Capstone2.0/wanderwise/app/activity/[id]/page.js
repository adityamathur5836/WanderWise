"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { activities, getDestinationById } from "../../lib/data";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "../../lib/localStorage";
import { toast } from "../../components/ui/sonner";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.id;
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState(null);
  const [destination, setDestination] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const activityId = Number(id);
      
      // Get activity data
      const activityData = activities.find(a => a.id === activityId);
      if (activityData) {
        setActivity(activityData);
        const destinationData = getDestinationById(activityData.destinationId);
        setDestination(destinationData);
        setFavorite(isInFavorites("activity", activityData.id));
      }
      setLoading(false);
      
      // Scroll to top when page loads
      window.scrollTo(0, 0);
    }
  }, [id]);

  // Carousel navigation functions
  const nextImage = () => {
    if (!activity?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === activity.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!activity?.images) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? activity.images.length - 1 : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites("activity", activity.id);
      toast.success("Removed from favorites");
    } else {
      saveToFavorites("activity", activity);
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

  if (!activity) {
    return (
      <div className="min-h-screen bg-blue-50 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Activity not found</h1>
          <Link href="/pages/hotelsactivity" className="text-blue-600 hover:text-blue-800">
            Return to Activities
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
          <Link href="/pages/hotelsactivity" className="text-black hover:text-blue-800 font-extrabold">
            ← Back to Activities
          </Link>
        </div>

        {/* Activity Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="inline-block bg-wanderwise-secondary text-white text-sm px-3 py-1 rounded-full mb-2">
                {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.name}</h1>
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
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-lg font-medium">{activity.rating}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-1" />
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 mr-1" />
              <span>Small group</span>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative h-[500px] mb-8 rounded-lg overflow-hidden">
          {activity.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${activity.name} - Image ${index + 1}`}
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

        {/* Activity Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">About this activity</h2>
              <p className="text-gray-600 mb-6">{activity.description}</p>
              
              <h3 className="text-xl font-semibold mb-4">What's included</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Professional guide</li>
                <li>All necessary equipment</li>
                <li>Transportation (if applicable)</li>
                <li>Refreshments (if applicable)</li>
                <li>Photos of your experience</li>
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ₹{activity.price.toLocaleString()}
                  <span className="text-base font-normal text-gray-600"> per person</span>
                </div>
                <div className="text-sm text-gray-600">
                  Free cancellation up to 24 hours before
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors">
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