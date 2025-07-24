"use client";
import { MapPin, Star, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-blue-700" />,
    title: "Expertly Curated",
    description: "Our travel experts handpick only the most breathtaking destinations worth your precious vacation time."
  },
  {
    icon: <Star className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />,
    title: "Tailored Experiences",
    description: "Every itinerary is customized to your interests, budget, and travel style for the perfect journey."
  },
  {
    icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-700" />,
    title: "Worry-Free Travel",
    description: "From 24/7 support to flexible bookings, we've got you covered before, during, and after your trip."
  },
  {
    icon: <Globe className="w-10 h-10 sm:w-12 sm:h-12 text-blue-700" />,
    title: "Local Expertise",
    description: "Discover hidden gems and authentic experiences with our network of local guides and partners."
  }
];

const WhyChooseUs = () => {

  return (
    <section className="section-padding bg-white">
      <div className="container-responsive">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose WanderWise</h2>
          <p className="responsive-text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're passionate about crafting memorable travel experiences that inspire and delight.
            Here's what sets us apart:
          </p>
        </div>

        <div className="grid-responsive-1-2-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 sm:p-6 rounded-xl bg-gray-50 hover:shadow-lg hover:bg-gray-100 transition-all duration-300 animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 sm:mb-4 p-3 rounded-full bg-white shadow-sm">{feature.icon}</div>
              <h3 className="responsive-text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
