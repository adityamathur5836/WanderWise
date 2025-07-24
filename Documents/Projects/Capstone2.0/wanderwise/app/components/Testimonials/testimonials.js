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
    <section className="bg-wanderwise-light-blue mb-60">
      <div className="container-responsive">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="responsive-text-2xl font-bold text-gray-900 mb-3">Traveler Stories</h2>
          <p className="responsive-text-base text-gray-600">Hear what our community has to say about their WanderWise experiences</p>
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
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg mx-4 sm:mx-0">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="mb-4 sm:mb-0 sm:mr-6 lg:mr-8 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-wanderwise-light-blue mx-auto"
                    />
                  </div>
                  <div className="flex-1">
                    <blockquote className="responsive-text-lg italic text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs sm:text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Prev/Next Buttons - Hidden on mobile, visible on larger screens */}
          <button
            onClick={handlePrev}
            className="hidden sm:block absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 lg:p-3 hover:bg-gray-100 transition-all hover:scale-110"
            aria-label={'Previous testimonial'}
            style={{zIndex: 20}}
          >
            <span className={'sr-only'}>Previous</span>
            <svg width="20" height="20" className="lg:w-6 lg:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M15 19l-7-7 7-7'/></svg>
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 lg:p-3 hover:bg-gray-100 transition-all hover:scale-110"
            aria-label={'Next testimonial'}
            style={{zIndex: 20}}
          >
            <span className={'sr-only'}>Next</span>
            <svg width="20" height="20" className="lg:w-6 lg:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M9 5l7 7-7 7'/></svg>
          </button>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex justify-center gap-4 mt-6 sm:hidden">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all"
            aria-label={'Previous testimonial'}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M15 19l-7-7 7-7'/></svg>
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 transition-all"
            aria-label={'Next testimonial'}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M9 5l7 7-7 7'/></svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 sm:mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mx-1.5 sm:mx-2 transition-all ${
                idx === activeIndex
                  ? "bg-wanderwise-secondary scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
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
