// Script to fix products.js file structure
const fs = require('fs');

// Read the corrupted file
let content = fs.readFileSync('../src/frontend/js/products.js', 'utf8');

// Add the missing header
const header = `// E-Commerce Product Catalog - Updated for New Database Schema
// 47 Products across Men's Clothing, Women's Clothing, and Electronics
// Schema aligned with PRODUCT table: id, name, description, price, category, image_url, stock, is_active, created_at

// Helper function to generate timestamps (simulating creation dates)
const generateCreatedAt = (monthsAgo = 0) => {
    const date = new Date('2026-01-12T21:57:28+05:30');
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toISOString();
};

// Categories structure
const CATEGORIES = {
    men: { name: "Men", subcategories: ["Shirts", "T-Shirts", "Pants"] },
    women: { name: "Women", subcategories: ["Tops", "Sweaters", "Pants"] },
    electronics: { name: "Electronics", subcategories: ["Laptops", "Mobiles", "Headphones"] }
};

const PRODUCTS = [
    // MEN'S SHIRTS (14 products)
    {
        id: 1,
        `;

// Find where the first product starts (after line 5)
const lines = content.split('\n');
let productStartIndex = lines.findIndex(line => line.includes('name: "Azure Linen Classic"'));

if (productStartIndex > 0) {
    // Get everything from the first product onwards
    const productsContent = lines.slice(productStartIndex).join('\n');

    // Write the fixed file
    const fixed = header + productsContent;
    fs.writeFileSync('../src/frontend/js/products-fixed.js', fixed, 'utf8');
    console.log('Fixed products.js saved as products-fixed.js');
} else {
    console.log('Could not find product start');
}
