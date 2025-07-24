"use client";
import { MapPin, Star, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-12 h-12 text-blue-700" />,
    title: "Expertly Curated",
    description: "Our travel experts handpick only the most breathtaking destinations worth your precious vacation time."
  },
  {
    icon: <Star className="w-12 h-12 text-yellow-500" />,
    title: "Tailored Experiences",
    description: "Every itinerary is customized to your interests, budget, and travel style for the perfect journey."
  },
  {
    icon: <Shield className="w-12 h-12 text-green-700" />,
    title: "Worry-Free Travel",
    description: "From 24/7 support to flexible bookings, we've got you covered before, during, and after your trip."
  },
  {
    icon: <Globe className="w-12 h-12 text-blue-700" />,
    title: "Local Expertise",
    description: "Discover hidden gems and authentic experiences with our network of local guides and partners."
  }
];

const WhyChooseUs = () => {

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose WanderWise</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We're passionate about crafting memorable travel experiences that inspire and delight.
            Here's what sets us apart:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
