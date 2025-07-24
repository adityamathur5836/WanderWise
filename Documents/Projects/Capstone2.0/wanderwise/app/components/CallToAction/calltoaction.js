import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1682687981630-cefe9cd73072?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
          alt="Travel inspiration"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="container-responsive relative z-10">
        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">
          <h2 className="responsive-text-2xl font-bold text-white mb-4 sm:mb-6">
            Ready for your next adventure?
          </h2>
          <p className="responsive-text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Start planning your dream trip today with our personalized recommendations and expert travel guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              href="/pages/destination"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-wanderwise-primary font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span className="hidden sm:inline">Explore destinations</span>
              <span className="sm:hidden">Explore</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/pages/budgetestimator"
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-wanderwise-secondary text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span className="hidden sm:inline">Plan your budget</span>
              <span className="sm:hidden">Plan budget</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
