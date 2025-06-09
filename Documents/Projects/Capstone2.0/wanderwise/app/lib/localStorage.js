export const saveToFavorites = (type, item) => {
    const key = `wanderwise_favorites_${type}`;
    const existingItems = JSON.parse(localStorage.getItem(key) || '[]');
  
    // Check if item already exists
    const exists = existingItems.some(existing => existing.id === item.id);
  
    if (!exists) {
      const updatedItems = [...existingItems, item];
      localStorage.setItem(key, JSON.stringify(updatedItems));
      return true; // Successfully added
    }
  
    return false; // Item already exists
  };
  
  // Remove an item from favorites
  export const removeFromFavorites = (type, itemId) => {
    const key = `wanderwise_favorites_${type}`;
    const existingItems = JSON.parse(localStorage.getItem(key) || '[]');
  
    const updatedItems = existingItems.filter(item => item.id !== itemId);
  
    localStorage.setItem(key, JSON.stringify(updatedItems));
    return true; // Successfully removed
  };
  
  // Get all favorite items of a particular type
  export const getFavorites = (type) => {
    const key = `wanderwise_favorites_${type}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  };
  
  // Check if an item is in favorites
  export const isInFavorites = (type, itemId) => {
    const favorites = getFavorites(type);
    return favorites.some(item => item.id === itemId);
  };