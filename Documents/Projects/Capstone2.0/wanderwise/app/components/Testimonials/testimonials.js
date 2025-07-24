'use client';
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    quote: "WanderWise made planning our honeymoon so simple! The recommendations were spot on and we discovered places we never would have found on our own.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "Miguel Santos",
    location: "Barcelona, Spain",
    quote: "As someone who travels frequently for work, I appreciate how WanderWise helps me extend my business trips into mini vacations with perfect weekend itineraries.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    name: "Emma Chen",
    location: "Sydney, Australia",
    quote: "The budget estimator was a game changer for our family vacation. No surprises, just a well-planned trip that was within our means and beyond our expectations!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Remove auto-transition
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((current) => (current + 1) % testimonials.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Handlers for previous/next
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 bg-wanderwise-light-blue pb-55 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Traveler Stories</h2>
          <p className="text-gray-600 mt-2">Hear what our community has to say about their WanderWise experiences</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 absolute top-0 left-0 w-full ${
                idx === activeIndex
                  ? "opacity-100 translate-x-0 z-10"
                  : "opacity-0 translate-x-8 -z-10"
              }`}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                  <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-wanderwise-light-blue"
                    />
                  </div>
                  <div>
                    <blockquote className="text-xl italic text-gray-700 mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Prev/Next Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
            aria-label={'Previous testimonial'}
            style={{zIndex: 20}}
          >
            <span className={'sr-only'}>Previous</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M15 19l-7-7 7-7'/></svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
            aria-label={'Next testimonial'}
            style={{zIndex: 20}}
          >
            <span className={'sr-only'}>Next</span>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M9 5l7 7-7 7'/></svg>
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full mx-2 transition-all ${
                idx === activeIndex
                  ? "bg-wanderwise-secondary scale-125"
                  : "bg-gray-300"
              }`}
              aria-label={`View testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
