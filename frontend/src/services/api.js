const BASE_URL = 'http://127.0.0.1:5000'; 

/**
 * Fetches the list of products from the backend API.
 * Uses asynchronous fetch with standard error handling.
 */
export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error("API Service Error (getProducts):", error);
        
        // Return fallback data to ensure the UI remains functional
        return [
            { id: 1, name: "Fallback: Watch", price: 199.99, category: "Essential" },
            { id: 2, name: "Fallback: Bag", price: 45.00, category: "Essential" }
        ];
    }
};