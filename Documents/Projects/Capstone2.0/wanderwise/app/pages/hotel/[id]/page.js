"use client";
import React, { use, useEffect, useState } from "react";
import { Star, CalendarDays, BedDouble, Wifi, ShowerHead } from "lucide-react";
import Navbar from "@/app/components/Navbar/navbar";
import Footer from "@/app/components/Footer/footer";

export default function HotelDetailPage({ params }) {
  const { id } = use(params);

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch("https://dummyjson.com/c/9794-cd1d-449d-98d7")
      .then((res) => res.json())
      .then((data) => {
        const hotels = Array.isArray(data.hotels) ? data.hotels : data;
        const foundHotel = hotels.find((h) => String(h.id) === String(id));
        setHotel(foundHotel);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hotel:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  if (!hotel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Hotel not found.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[350px] sm:h-[500px] w-full mt-18">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="bg-gray-900/40 backdrop-blur-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold">{hotel.name}</h1>
            <p className="text-sm flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {hotel.rating} / 5.0
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {hotel.description}
          </p>

          <h3 className="text-lg font-medium mb-2">Amenities</h3>
          <ul className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <BedDouble className="w-4 h-4" /> Comfortable Beds
            </li>
            <li className="flex items-center gap-2">
              <Wifi className="w-4 h-4" /> Free Wi-Fi
            </li>
            <li className="flex items-center gap-2">
              <ShowerHead className="w-4 h-4" /> Clean Bathrooms
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> 24/7 Room Service
            </li>
          </ul>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-xl shadow p-6 sticky top-28">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ₹{hotel.pricePerNight || "5000"}{" "}
            <span className="text-base font-medium text-gray-500">/ night</span>
          </p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-4">
            Book Now
          </button>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p>✔ Free cancellation</p>
            <p>✔ No booking fees</p>
            <p>✔ Instant confirmation</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
