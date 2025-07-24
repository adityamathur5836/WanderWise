import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="container-responsive">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">WanderWise</h3>
            <p className="mb-4 sm:mb-6 text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs mx-auto sm:mx-0">
              Inspiring your journey, one destination at a time. Plan smarter, travel better.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a
                href="https://www.linkedin.com/in/aditya-mathur-734548323/"
                className="text-gray-400 hover:text-wanderwise-secondary transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Aditya_5934"
                className="text-gray-400 hover:text-wanderwise-secondary transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/adityamathur70/"
                className="text-gray-400 hover:text-wanderwise-secondary transition-colors p-2 rounded-full hover:bg-gray-800"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pages/destination" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/pages/hotelspage" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/pages/activitypage" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/pages/favorites" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/pages/budgetestimator" className="text-gray-400 hover:text-wanderwise-secondary transition-colors text-sm sm:text-base">
                  Budget Estimator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-3 sm:mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start justify-center sm:justify-start">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-wanderwise-secondary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm sm:text-base">Rishihood University, Sonipat, Haryana, India</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-wanderwise-secondary" />
                <span className="text-gray-400 text-sm sm:text-base">+91 7357494567</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-wanderwise-secondary" />
                <span className="text-gray-400 text-sm sm:text-base break-all">aditya.2024@nst.rishihood.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} WanderWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
