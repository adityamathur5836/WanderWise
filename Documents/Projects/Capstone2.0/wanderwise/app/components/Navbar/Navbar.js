// import { ClerkProvider } from "@clerk/nextjs";
// import Link from "next/link";
// import AuthButtons from "../AuthButton";

// export default function Navbar() {
//   return (
//     <ClerkProvider>
//       <div className="flex justify-between text-white bg-opacity-5 bg-black w-full h-15 z-11">
//         <Link href= "/" className="font-extrabold cursor-pointer text-3xl z-10 mb-auto mt-auto ml-10">WanderWise</Link>
//         <nav className="space-x-4 mb-auto mt-auto z-11 mr-30">
//           <Link href="/" className="cursor-pointer text-white font-bold z-11">Home</Link>
//           <Link href="/about" className="text-white cursor-pointer font-bold z-11">About</Link>
//           <Link href="/contact" className="text-white cursor-pointer font-bold z-11">Contact</Link>
//         </nav>
//         <AuthButtons/>
//       </div>
//     </ClerkProvider>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Heart, Map } from "lucide-react";

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
    { name: "Destinations", path: "/destinations" },
    { name: "Hotels & Activities", path: "/hotels-activities" },
    { name: "Budget Estimator", path: "/budget" },
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
        <Link
          href="/"
          className={`font-bold text-2xl ${
            !scrolled && pathname === "/" && !isMenuOpen
              ? "text-white"
              : "text-wanderwise-primary"
          }`}
        >
          <span className="flex items-center gap-2">
            <Map className="w-6 h-6" />
            WanderWise
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-medium transition-colors hover:text-wanderwise-secondary ${
                !scrolled && pathname === "/" && !isMenuOpen
                  ? "text-white hover:text-wanderwise-light"
                  : "text-gray-700"
              } ${pathname === link.path ? "text-wanderwise-secondary" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/search"
            className={`transition-colors hover:text-wanderwise-secondary ${
              !scrolled && pathname === "/" ? "text-white" : "text-gray-700"
            }`}
          >
            <Search className="w-5 h-5" />
          </Link>
          <Link
            href="/favorites"
            className={`transition-colors hover:text-wanderwise-secondary ${
              !scrolled && pathname === "/" ? "text-white" : "text-gray-700"
            }`}
          >
            <Heart className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile menu button */}
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden animate-fade-in">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium text-gray-700 py-2 transition-colors hover:text-wanderwise-secondary ${
                    pathname === link.path ? "text-wanderwise-secondary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-8 py-2">
                <Link
                  href="/search"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Favorites
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
