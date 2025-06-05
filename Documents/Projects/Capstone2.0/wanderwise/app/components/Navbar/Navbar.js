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
    { name: "Destinations", path: "/pages" },
    { name: "Hotels & Activities", path: "/pages/hotelsactivity" },
    { name: "Budget Estimator", path: "/pages/budgetestimator" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled || isMenuOpen || pathname !== "/"
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              scrolled || pathname !== "/"
                ? "bg-white text-wanderwise-primary"
                : "bg-black/30 text-white"
            } backdrop-blur-sm`}
          >
            <Map className="w-5 h-5" />
            WanderWise
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-base font-semibold transition-colors hover:text-wanderwise-secondary ${
                pathname === link.path
                  ? "text-wanderwise-secondary"
                  : scrolled || pathname !== "/"
                  ? "text-gray-700"
                  : "text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Icons + Auth */}
        <div className="hidden md:flex items-center gap-4">
          <div
            className={`flex items-center gap-4 px-4 py-2 rounded-full ${
              scrolled || pathname !== "/"
                ? "bg-white text-wanderwise-primary"
                : "bg-black/30 text-white"
            } backdrop-blur-sm`}
          >
            <Link
              href="/search"
              className="hover:text-wanderwise-secondary"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/pages/favorites"
              className="hover:text-wanderwise-secondary"
            >
              <Heart className="w-5 h-5" />
            </Link>
          </div>
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X
              className={`w-6 h-6 ${
                !scrolled && pathname === "/" && !isMenuOpen
                  ? "text-white"
                  : "text-gray-700"
              }`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${
                !scrolled && pathname === "/" && !isMenuOpen
                  ? "text-white"
                  : "text-gray-700"
              }`}
            />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden animate-fade-in z-20">
            <div className="px-4 py-4 flex flex-col space-y-4 border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 border-b text-gray-800 font-medium ${
                    pathname === link.path ? "text-wanderwise-secondary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex justify-between items-center pt-4">
                <Link
                  href="/search"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Heart className="w-5 h-5" />
                  Favorites
                </Link>
              </div>
              <AuthButtons />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
