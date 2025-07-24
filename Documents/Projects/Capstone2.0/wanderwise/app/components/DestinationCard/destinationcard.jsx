import { useState } from 'react';
import Link from "next/link";
import { Heart } from "lucide-react";
import { isInFavorites, saveToFavorites, removeFromFavorites } from "../../lib/localStorage";
import { toast } from "../ui/sonner";

const DestinationCard = ({ destination, index = 0 }) => {
  const [favorite, setFavorite] = useState(isInFavorites("destinations", destination.id));
  const delay = index * 150;

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorite) {
      removeFromFavorites("destinations", destination.id);
      toast.success("Removed from favorites");
    } else {
      saveToFavorites("destinations", destination);
      toast.success("Added to favorites");
    }

    setFavorite(!favorite);
  };

  return (
    <Link
      href={`/pages/destination/${destination.id}`}
      className="block group animate-fade-in rounded-xl overflow-hidden relative shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]">
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all duration-200 z-10 hover:scale-110"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${favorite ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>

        {/* Destination Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
          <div className="flex justify-between items-end">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold mb-1 truncate">{destination.name}</h3>
              <p className="text-sm text-gray-200 truncate">{destination.country}</p>
            </div>
            <div className="ml-3 flex-shrink-0">
              <span className="bg-white/20 backdrop-blur-sm text-xs sm:text-sm px-2 py-1 rounded-full font-medium">
                {destination.rating} ★
              </span>
            </div>
          </div>
        </div>

        {/* Trending Tag */}
        {destination.isTrending && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 sm:px-2.5 rounded z-10 shadow-sm">
            Trending
          </div>
        )}
      </div>
    </Link>
  );
};

export default DestinationCard;