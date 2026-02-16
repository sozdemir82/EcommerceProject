const API_URL = "http://127.0.0.1:5000/api"; // URL'in sonuna /api ekledik

/**
 * Fetches all products from the backend API.
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Service Error (getProducts):", error);
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Service Error (getProductById - ${id}):`, error);
    throw error;
  }
};