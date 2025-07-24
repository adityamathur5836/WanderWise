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
      className="block group animate-fade-in rounded-xl overflow-hidden relative"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full aspect-[4/3]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t" />

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition z-10"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>

        {/* Destination Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold inline-flex items-center px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-white text-sm">{destination.name}</h3>
            <p className="text-sm text-gray-200 inline-flex items-center px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-white text-sm">{destination.country}</p>
          </div>
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{destination.rating} ★</span>
        </div>

        {/* Trending Tag */}
        {destination.isTrending && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-extrabold px-2.5 py-1 rounded z-10">
            Trending
          </div>
        )}
      </div>
    </Link>
  );
};

export default DestinationCard;