import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8 flex justify-evenly">
      <div className="container mx-auto px-4">
        <div className="flex justify-evenly">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">WanderWise</h3>
            <p className="mb-4 text-gray-400 w-40">
              Inspiring your journey, one destination at a time. Plan smarter, travel better.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/aditya-mathur-734548323/" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/Aditya_5934" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/adityamathur70/" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hotels-activities" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                  Hotels & Activities
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/budget" className="text-gray-400 hover:text-wanderwise-secondary transition-colors">
                  Budget Estimator
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-wanderwise-secondary" />
                <span className="text-gray-400">Rishihood University, Sonipat, Haryana, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-wanderwise-secondary" />
                <span className="text-gray-400">+91 7357494567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-wanderwise-secondary" />
                <span className="text-gray-400">aditya.2024@nst.rishihood.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WanderWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
