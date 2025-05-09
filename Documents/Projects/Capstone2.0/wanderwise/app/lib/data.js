// Featured Destinations
export const featuredDestinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    description: "Experience the stunning white-washed buildings and blue domes overlooking the Aegean Sea in this iconic Greek paradise.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80",
    rating: 4.8,
    priceLevel: "$$$",
    isTrending: true
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description: "Discover ancient temples, traditional tea houses, and the famous cherry blossoms in Japan's cultural heart.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80",
    rating: 4.7,
    priceLevel: "$$$",
    isTrending: false
  },
  {
    id: 3,
    name: "Amalfi Coast",
    country: "Italy",
    description: "Drive along dramatic cliffs, visit charming coastal villages, and indulge in authentic Italian cuisine along the Mediterranean.",
    image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=2400&q=80",
    rating: 4.9,
    priceLevel: "$$$$",
    isTrending: true
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    description: "Find your balance in this spiritual island known for lush rice terraces, sacred temples, and world-class surfing.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=80",
    rating: 4.5,
    priceLevel: "$$",
    isTrending: true
  },
  {
    id: 5,
    name: "Reykjavik",
    country: "Iceland",
    description: "Explore volcanic landscapes, soak in geothermal lagoons, and chase the northern lights in this land of fire and ice.",
    image: "https://images.unsplash.com/photo-1504233529578-6d46baba6d34?auto=format&fit=crop&w=2400&q=80",
    rating: 4.6,
    priceLevel: "$$$",
    isTrending: false
  },
  {
    id: 6,
    name: "Marrakech",
    country: "Morocco",
    description: "Lose yourself in labyrinthine medinas, bustling souks, and the rich colors and scents of this North African gem.",
    image: "https://images.unsplash.com/photo-1597212720418-203156592f58?auto=format&fit=crop&w=2400&q=80",
    rating: 4.4,
    priceLevel: "$$",
    isTrending: false
  }
];

// All Destinations
export const allDestinations = [
  ...featuredDestinations,
  {
    id: 7,
    name: "New York City",
    country: "USA",
    description: "Experience the energy of the city that never sleeps...",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2400&q=80",
    rating: 4.7,
    priceLevel: "$$$$",
    isTrending: true
  },
  {
    id: 8,
    name: "Cape Town",
    country: "South Africa",
    description: "Discover the stunning meeting point of mountains and oceans...",
    image: "https://images.unsplash.com/photo-1576485375217-d6a95e34d043?auto=format&fit=crop&w=2400&q=80",
    rating: 4.5,
    priceLevel: "$$",
    isTrending: false
  },
  {
    id: 9,
    name: "Bangkok",
    country: "Thailand",
    description: "Immerse yourself in this vibrant city...",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=2400&q=80",
    rating: 4.3,
    priceLevel: "$",
    isTrending: true
  },
  {
    id: 10,
    name: "Machu Picchu",
    country: "Peru",
    description: "Trek to the ancient Incan citadel...",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=2400&q=80",
    rating: 4.9,
    priceLevel: "$$$",
    isTrending: false
  },
  {
    id: 11,
    name: "Sydney",
    country: "Australia",
    description: "Enjoy one of the world's most beautiful harbors...",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=80",
    rating: 4.7,
    priceLevel: "$$$",
    isTrending: true
  },
  {
    id: 12,
    name: "Barcelona",
    country: "Spain",
    description: "Wander through streets filled with Gaudí's architecture...",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2400&q=80",
    rating: 4.6,
    priceLevel: "$$",
    isTrending: false
  }
];

// Hotels
export const hotels = [
  {
    id: 101,
    name: "Celestial Villas",
    destinationId: 1,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=80",
    rating: 4.9,
    pricePerNight: 450,
    description: "Luxurious clifftop villas...",
    amenities: ["Private Pool", "Free WiFi", "Breakfast", "Spa", "Airport Shuttle"]
  },
  {
    id: 102,
    name: "Kyoto Zen Retreat",
    destinationId: 2,
    image: "https://images.unsplash.com/photo-1553653924-39b70295f8da?auto=format&fit=crop&w=2400&q=80",
    rating: 4.7,
    pricePerNight: 380,
    description: "Traditional ryokan offering tatami rooms...",
    amenities: ["Onsen", "Garden", "Traditional Breakfast", "Tea Ceremony", "Yukata Provided"]
  },
  {
    id: 103,
    name: "Amalfi Seaside Resort",
    destinationId: 3,
    image: "https://images.unsplash.com/photo-1544097797-2a49661e2a2e?auto=format&fit=crop&w=2400&q=80",
    rating: 4.8,
    pricePerNight: 520,
    description: "Elegant resort carved into the cliffs...",
    amenities: ["Beach Access", "Infinity Pool", "Restaurant", "Bar", "Parking"]
  }
];

// Activities
export const activities = [
  {
    id: 201,
    name: "Santorini Sunset Catamaran Cruise",
    destinationId: 1,
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=2400&q=80",
    rating: 4.9,
    price: 110,
    duration: "5 hours",
    description: "Sail around the caldera...",
    category: "nature"
  },
  {
    id: 202,
    name: "Kyoto Temple & Shrine Tour",
    destinationId: 2,
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=2400&q=80",
    rating: 4.8,
    price: 85,
    duration: "Full day",
    description: "Guided tour of Kyoto's most beautiful temples...",
    category: "culture"
  },
  {
    id: 203,
    name: "Amalfi Coast Cooking Class",
    destinationId: 3,
    image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=2400&q=80",
    rating: 4.7,
    price: 120,
    duration: "4 hours",
    description: "Learn to prepare authentic Italian dishes...",
    category: "food"
  }
];

// Helper Functions
export const getHotelsByDestination = (destinationId) => {
  return hotels.filter(hotel => hotel.destinationId === destinationId);
};

export const getActivitiesByDestination = (destinationId) => {
  return activities.filter(activity => activity.destinationId === destinationId);
};

export const getDestinationById = (id) => {
  return allDestinations.find(destination => destination.id === id);
};
