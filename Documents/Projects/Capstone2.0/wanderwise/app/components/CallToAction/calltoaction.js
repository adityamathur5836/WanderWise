import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1682687981630-cefe9cd73072?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80"
          alt="Travel inspiration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for your next adventure?
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Start planning your dream trip today with our personalized recommendations and expert travel guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/destinations" passHref legacyBehavior>
              <a className="inline-flex items-center justify-center px-6 py-3 bg-white text-wanderwise-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Explore destinations
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Link>
            <Link href="/budget" passHref legacyBehavior>
              <a className="inline-flex items-center justify-center px-6 py-3 bg-wanderwise-secondary text-white font-medium rounded-lg hover:bg-orange-500 transition-colors">
                Plan your budget
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
