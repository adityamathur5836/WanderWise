// Amadeus API utility functions

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v2';
const AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';

let accessToken = null;
let tokenExpiry = null;

// Common city codes for reference
const VALID_CITY_CODES = {
  'PAR': 'Paris',
  'NYC': 'New York',
  'LON': 'London',
  'ROM': 'Rome',
  'MAD': 'Madrid',
  'BCN': 'Barcelona',
  'AMS': 'Amsterdam',
  'BER': 'Berlin',
  'MUC': 'Munich',
  'FCO': 'Rome',
  'CDG': 'Paris',
  'JFK': 'New York',
  'LHR': 'London',
  'MXP': 'Milan',
  'FRA': 'Frankfurt'
};

// Get authentication token
async function getAuthToken() {
  // Return existing token if it's still valid
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to get Amadeus token: ${error.error_description || 'Unknown error'}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    // Set token expiry to 25 minutes (tokens typically last 30 minutes)
    tokenExpiry = Date.now() + (25 * 60 * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error getting Amadeus token:', error);
    throw error;
  }
}

// Fetch hotels by city code
export async function getHotelsByCity(cityCode) {
  // Validate city code
  if (!cityCode) {
    throw new Error('City code is required');
  }

  // Convert to uppercase and trim
  cityCode = cityCode.toUpperCase().trim();

  // Log the attempt
  console.log(`Attempting to fetch hotels for city code: ${cityCode}`);

  try {
    const token = await getAuthToken();
    
    // First, try to validate the city code
    const validateResponse = await fetch(
      `${AMADEUS_BASE_URL}/reference-data/locations?subType=CITY&keyword=${cityCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!validateResponse.ok) {
      const error = await validateResponse.json();
      throw new Error(`Failed to validate city code: ${error.errors?.[0]?.detail || 'Invalid city code'}`);
    }

    const validateData = await validateResponse.json();
    if (!validateData.data || validateData.data.length === 0) {
      throw new Error(`No city found for code: ${cityCode}. Please use a valid city code like: ${Object.keys(VALID_CITY_CODES).join(', ')}`);
    }

    // If city is valid, proceed with hotel search
    const response = await fetch(
      `${AMADEUS_BASE_URL}/shopping/hotel-offers?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      if (error.errors?.[0]?.code === 38196) {
        throw new Error(`No hotels found for city code: ${cityCode}. Please try a different city code.`);
      }
      throw new Error(`Failed to fetch hotels: ${error.errors?.[0]?.detail || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Check if we got any hotels
    if (!data.data || data.data.length === 0) {
      throw new Error(`No hotels found for city code: ${cityCode}`);
    }

    console.log(`Successfully fetched ${data.data.length} hotels for ${cityCode}`);
    return data;
  } catch (error) {
    console.error('Error in getHotelsByCity:', error);
    throw error;
  }
}

// Search hotels by keyword
export async function searchHotels(keyword) {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${AMADEUS_BASE_URL}/reference-data/locations/hotels/by-keyword?keyword=${encodeURIComponent(keyword)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to search hotels: ${error.errors?.[0]?.detail || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
}

// Get hotel offers by hotel ID
export async function getHotelOffers(hotelId) {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${AMADEUS_BASE_URL}/shopping/hotel-offers?hotelIds=${hotelId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch hotel offers: ${error.errors?.[0]?.detail || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    throw error;
  }
}

// Get hotel photos by hotel ID
export async function getHotelPhotos(hotelId) {
  try {
    const token = await getAuthToken();
    const response = await fetch(
      `${AMADEUS_BASE_URL}/reference-data/locations/hotels/${hotelId}/photos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch hotel photos: ${error.errors?.[0]?.detail || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel photos:', error);
    throw error;
  }
}

// Helper function to format hotel data
export function formatHotelData(hotel) {
  return {
    id: hotel.hotel.hotelId,
    name: hotel.hotel.name,
    rating: hotel.hotel.rating,
    address: {
      cityCode: hotel.hotel.address.cityCode,
      cityName: hotel.hotel.address.cityName,
      countryCode: hotel.hotel.address.countryCode,
      lines: hotel.hotel.address.lines,
      postalCode: hotel.hotel.address.postalCode,
    },
    amenities: hotel.hotel.amenities || [],
    offers: hotel.offers.map(offer => ({
      id: offer.id,
      roomType: offer.room?.type,
      description: offer.room?.description?.text,
      price: {
        amount: offer.price.total,
        currency: offer.price.currency,
      },
      boardType: offer.boardType,
      cancellationPolicy: offer.policies?.cancellation,
    })),
  };
} 