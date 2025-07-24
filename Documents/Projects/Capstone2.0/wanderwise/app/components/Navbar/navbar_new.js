"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Heart, Map } from "lucide-react";
import AuthButtons from "../AuthButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/pages/destination" },
    { name: "Hotels", path: "/pages/hotelspage" },
    { name: "Activity", path: "/pages/activitypage"},
    { name: "Budget Estimator", path: "/pages/budgetestimator" },
    { name: 'Favorites', path: "/pages/favorites"}
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled || isMenuOpen || pathname !== "/"
          ? "bg-white shadow-md py-2 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container-responsive flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold z-40 relative">
          <span
            className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full transition-all duration-300 ${
              scrolled || pathname !== "/"
                ? "bg-white text-wanderwise-primary shadow-sm"
                : "bg-black/30 text-white"
            } backdrop-blur-sm`}
          >
            <Map className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="xs:inline">WanderWise</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm xl:text-base font-semibold transition-colors hover:text-wanderwise-secondary px-2 py-1 rounded ${
                pathname === link.path
                  ? "text-wanderwise-secondary bg-wanderwise-secondary/10"
                  : scrolled || pathname !== "/"
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-black hover:bg-white/10"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden z-40 relative p-2 rounded-lg transition-colors hover:bg-black/10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X
              className={`w-6 h-6 transition-colors ${
                !scrolled && pathname === "/" && !isMenuOpen
                  ? "text-white"
                  : "text-gray-700"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 transition-colors ${
                !scrolled && pathname === "/" && !isMenuOpen
                  ? "text-white"
                  : "text-gray-700"
              }`}
            />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg lg:hidden animate-slide-down z-30 border-t">
            <div className="container-responsive py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      pathname === link.path 
                        ? "text-wanderwise-secondary bg-wanderwise-secondary/10" 
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Quick Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <Link
                    href="/search"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-wanderwise-secondary transition-colors"
                  >
                    <Search className="w-5 h-5" />
                    <span className="text-sm">Search</span>
                  </Link>
                  <Link
                    href="/pages/favorites"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-wanderwise-secondary transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">Favorites</span>
                  </Link>
                </div>
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t border-gray-200">
                  <AuthButtons />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
