import { Link } from "next/link";
import { useEffect } from "react";
import { HomeIcon, ArrowRight } from "lucide-react";

const NotFound = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="text-center animate-fade-in">
        <h1 className="text-9xl font-bold text-wanderwise-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Oops! Destination not found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We can't seem to find the page you're looking for. The adventure you're seeking might be elsewhere.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-wanderwise-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            href="/destinations"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Explore Destinations
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
