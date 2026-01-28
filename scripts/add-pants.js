const fs = require('fs');

// Read the current products.js file
let content = fs.readFileSync('../src/frontend/js/products.js', 'utf8');

// New pants to add
const newPants = `,
{
    id: 72,
    name: "Dark Denim Wide Leg Jeans",
    price: 1499,
    originalPrice: 2199,
    category: "women",
    subcategory: "Pants",
    image_url: "./assets/images/womens_pants_dark_denim.jpg",
    rating: 4.7,
    reviews: 198,
    description: "Designed with durable fabric for a comfortable fit. Suitable for daily and work wear. Classic dark denim wide-leg jeans with vintage styling.",
    features: ["Wide Leg", "Denim Fabric", "High Waist", "Front Pintucks", "Premium Cotton"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Dark Denim", "Black Denim", "Mid Wash"],
    stock: 84,
    tag: "Classic",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 73,
    name: "Black Pleated Wide Leg Pants",
    price: 1299,
    originalPrice: 1999,
    category: "women",
    subcategory: "Pants",
    image_url: "./assets/images/womens_pants_black_pleated.jpg",
    rating: 4.8,
    reviews: 245,
    description: "Designed with durable fabric for a comfortable fit. Suitable for daily and work wear. Elegant black pleated pants perfect for professional settings.",
    features: ["Pleated Design", "Wide Leg", "High Waist", "Office Wear", "Wrinkle Resistant"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Charcoal"],
    stock: 96,
    tag: "Professional",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 74,
    name: "Beige Pleated Palazzo Pants",
    price: 1399,
    originalPrice: 2099,
    category: "women",
    subcategory: "Pants",
    image_url: "./assets/images/womens_pants_beige_pleated.jpg",
    rating: 4.6,
    reviews: 167,
    description: "Designed with durable fabric for a comfortable fit. Suitable for daily and work wear. Versatile beige palazzo pants with pleat detailing.",
    features: ["Palazzo Style", "Pleated Front", "Wide Leg", "Button Detail", "Flowing Fabric"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "White", "Light Grey"],
    stock: 72,
    tag: "Versatile",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 75,
    name: "Vintage Wash Wide Leg Jeans",
    price: 1599,
    originalPrice: 2399,
    category: "women",
    subcategory: "Pants",
    image_url: "./assets/images/womens_pants_vintage_denim.jpg",
    rating: 4.9,
    reviews: 312,
    description: "Designed with durable fabric for a comfortable fit. Suitable for daily and work wear. Trendy vintage wash jeans with relaxed wide-leg fit.",
    features: ["Vintage Wash", "Wide Leg", "Relaxed Fit", "Premium Denim", "Distressed Look"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Vintage Blue", "Faded Black", "Light Wash"],
    stock: 68,
    tag: "Trending",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 76,
    name: "Light Blue Wide Leg Denim",
    price: 1399,
    originalPrice: 2199,
    category: "women",
    subcategory: "Pants",
    image_url: "./assets/images/womens_pants_light_denim.png",
    rating: 4.7,
    reviews: 223,
    description: "Designed with durable fabric for a comfortable fit. Suitable for daily and work wear. Fresh light blue denim with contemporary wide-leg silhouette.",
    features: ["Light Wash", "Wide Leg", "High Rise", "Cotton Denim", "Breathable"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Blue", "Mid Blue", "White"],
    stock: 88,
    tag: "Fresh",
    is_active: true,
    created_at: generateCreatedAt(0)
}`;

// Replace the closing bracket with new products + closing bracket
content = content.replace(/\}\n\];/, newPants + '\n];');

// Write back to file
fs.writeFileSync('../src/frontend/js/products.js', content, 'utf8');
console.log('✅ Successfully added 5 new women\'s pants!');
