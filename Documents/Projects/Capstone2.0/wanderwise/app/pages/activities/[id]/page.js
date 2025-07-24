"use client";
import React, { useEffect, useState, use} from "react";
import { Star, CalendarDays } from "lucide-react";
import Navbar from "@/app/components/Navbar/navbar_new";
import Footer from "@/app/components/Footer/footer";

export default function ActivityDetailPage({ params }) {
  const { id } = use(params); // unwrap promise

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch("https://dummyjson.com/c/7839-3302-4526-9f02")
      .then((res) => res.json())
      .then((data) => {
        const activities = Array.isArray(data.activities) ? data.activities : data;
        const found = activities.find((act) => String(act.id) === String(id));
        setActivity(found || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!activity) return <div className="p-8 text-gray-600">Activity not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="relative h-[350px] sm:h-[500px] w-full mt-18">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="bg-gray-900/40 backdrop-blur-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl sm:text-4xl font-bold">{activity.name}</h1>
            <p className="text-sm flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {activity.rating || "4.5"} / 5.0
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {activity.description}
          </p>

          <h3 className="text-lg font-medium mb-2">Details</h3>
          <ul className="grid grid-cols-2 gap-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Duration: {activity.duration}
            </li>
            <li className="flex items-center gap-2">
              Category: {activity.category}
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-6 sticky top-28">
          <p className="text-2xl font-bold text-gray-900 mb-2">
            ₹{activity.price || "1000"}{" "}
            <span className="text-base font-medium text-gray-500">/ person</span>
          </p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 mt-4">
            Book Activity
          </button>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p>✔ Expert Guides</p>
            <p>✔ Flexible Timings</p>
            <p>✔ Instant confirmation</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
