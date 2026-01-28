const fs = require('fs');

// Read the current products.js file
let content = fs.readFileSync('../src/frontend/js/products.js', 'utf8');

// New dresses to add
const newDresses = `,
{
    id: 68,
    name: "Sage Green Shirt Dress",
    price: 1899,
    originalPrice: 2799,
    category: "women",
    subcategory: "Dresses",
    image_url: "./assets/images/womens_dress_green_shirt.png",
    rating: 4.7,
    reviews: 167,
    description: "Designed with a comfortable fit using premium material. Suitable for everyday and occasion wear. Classic shirt dress in elegant sage green with button-front and belted waist.",
    features: ["Button Front", "Belted Waist", "Collar Detail", "Midi Length", "Premium Fabric"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sage Green", "Navy", "Beige"],
    stock: 45,
    tag: "Elegant",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 69,
    name: "Chocolate Tiered Ruched Dress",
    price: 1599,
    originalPrice: 2399,
    category: "women",
    subcategory: "Dresses",
    image_url: "./assets/images/womens_dress_brown_ruched.png",
    rating: 4.8,
    reviews: 203,
    description: "Designed with a comfortable fit using premium material. Suitable for everyday and occasion wear. Stunning one-shoulder dress with ruched bodice and tiered skirt.",
    features: ["One Shoulder", "Ruched Bodice", "Tiered Skirt", "Gold Buckle", "Party Wear"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Chocolate", "Black", "Burgundy"],
    stock: 38,
    tag: "Party",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 70,
    name: "Black Asymmetric Ruched Dress",
    price: 1399,
    originalPrice: 2199,
    category: "women",
    subcategory: "Dresses",
    image_url: "./assets/images/womens_dress_black_asymmetric.jpg",
    rating: 4.9,
    reviews: 289,
    description: "Designed with a comfortable fit using premium material. Suitable for everyday and occasion wear. Chic black dress with ruched details and asymmetric hem.",
    features: ["Asymmetric Hem", "Ruched Waist", "Bell Sleeves", "Square Neck", "Stretch Fabric"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Emerald"],
    stock: 76,
    tag: "Bestseller",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 71,
    name: "Brown Ribbed Halter Dress",
    price: 1699,
    originalPrice: 2499,
    category: "women",
    subcategory: "Dresses",
    image_url: "./assets/images/womens_dress_brown_ribbed.jpg",
    rating: 4.6,
    reviews: 156,
    description: "Designed with a comfortable fit using premium material. Suitable for everyday and occasion wear. Sophisticated ribbed dress with halter neck and bell sleeves.",
    features: ["Halter Neck", "Bell Sleeves", "Ribbed Texture", "Bodycon Fit", "Midi Length"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Brown", "Black", "Burgundy"],
    stock: 52,
    tag: "Chic",
    is_active: true,
    created_at: generateCreatedAt(0)
}`;

// Replace the closing bracket with new products + closing bracket
content = content.replace(/\}\n\];/, newDresses + '\n];');

// Write back to file
fs.writeFileSync('../src/frontend/js/products.js', content, 'utf8');
console.log('✅ Successfully added 4 new women\'s dresses!');
