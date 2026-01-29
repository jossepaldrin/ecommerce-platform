// E-Commerce Product Catalog - Fetched from Backend API
// Schema aligned with PRODUCT table: id, name, description, price, category, image_url, stock, is_active, created_at

// Categories constant (Structure definitions)
const CATEGORIES = {
    men: { name: "Men", subcategories: ["Shirts", "T-Shirts", "Pants"] }, // Subcategories might be unused if DB doesn't have them
    women: { name: "Women", subcategories: ["Tops", "Sweaters", "Pants"] },
    electronics: { name: "Electronics", subcategories: ["Laptops", "Mobiles", "Headphones", "Tablets", "Wearables", "Gaming", "Accessories"] }
};

let PRODUCTS = []; // Initialize empty array

// Function to fetch products from API
async function loadProducts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const API_BASE_URL = 'http://127.0.0.1:8000';

        // Update global PRODUCTS array
        PRODUCTS = data.products.map(p => ({
            ...p,
            price: parseFloat(p.price), // Ensure price is number
            image_url: p.image_url.startsWith('/media/') ? `${API_BASE_URL}${p.image_url}` : p.image_url
        }));

        console.log(`✅ Loaded ${PRODUCTS.length} products from Database`);

        // Dispatch event for other components to know data is ready
        window.dispatchEvent(new CustomEvent('productsLoaded', { detail: PRODUCTS }));

    } catch (error) {
        console.error('❌ Error loading products:', error);
        // Fallback or empty state handling could go here
    }
}

// Auto-load on include if desired, or let main app call it.
// Since existing code expects PRODUCTS to be ready, we must start loading immediately.
// Any code relying on PRODUCTS *synchronously* at top-level will break.
// We should check 'combined_index.html' to see IF it waits.
// Most modern apps render in valid DOMContentLoaded.
loadProducts();