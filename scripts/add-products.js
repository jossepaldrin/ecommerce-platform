const fs = require('fs');

// Read the current products.js file
let content = fs.readFileSync('../src/frontend/js/products.js', 'utf8');

// New products to add
const newProducts = `,
{
    id: 63,
    name: "Polka Dot Peplum Top",
    price: 1099,
    originalPrice: 1699,
    category: "women",
    subcategory: "Tops",
    image_url: "./assets/images/womens_top_polka_dot.jpg",
    rating: 4.6,
    reviews: 142,
    description: "Made from quality fabric for all-day comfort. Features a simple design suitable for regular wear. Charming polka dot pattern with peplum hem and puff sleeves.",
    features: ["Polka Dot Print", "Peplum Hem", "Puff Sleeves", "Tie Front", "Cotton Blend"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream/Black", "White/Navy", "Pink/Black"],
    stock: 56,
    tag: "New",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 64,
    name: "Burgundy Ruched Crop Top",
    price: 899,
    originalPrice: 1399,
    category: "women",
    subcategory: "Tops",
    image_url: "./assets/images/womens_top_burgundy.jpg",
    rating: 4.7,
    reviews: 178,
    description: "Made from quality fabric for all-day comfort. Features a simple design suitable for regular wear. Elegant burgundy crop top with ruched detailing.",
    features: ["Ruched Design", "Crop Length", "Long Sleeve", "Fitted Cut", "Stretch Fabric"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Burgundy", "Black", "Navy"],
    stock: 68,
    tag: "Trending",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 65,
    name: "Black Ruched Fitted Top",
    price: 799,
    originalPrice: 1299,
    category: "women",
    subcategory: "Tops",
    image_url: "./assets/images/womens_top_black_ruched.jpg",
    rating: 4.8,
    reviews: 234,
    description: "Made from quality fabric for all-day comfort. Features a simple design suitable for regular wear. Classic black fitted top with elegant ruched sides.",
    features: ["Ruched Sides", "Fitted Cut", "Long Sleeve", "Boat Neck", "Premium Stretch"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    stock: 92,
    tag: "Essential",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 66,
    name: "Striped Bow Shoulder Top",
    price: 1199,
    originalPrice: 1799,
    category: "women",
    subcategory: "Tops",
    image_url: "./assets/images/womens_top_striped_bow.jpg",
    rating: 4.5,
    reviews: 156,
    description: "Made from quality fabric for all-day comfort. Features a simple design suitable for regular wear. Charming striped top with bow shoulder straps.",
    features: ["Striped Pattern", "Bow Straps", "Peplum Hem", "Cotton Fabric", "Square Neck"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue/White", "Pink/White", "Green/White"],
    stock: 48,
    tag: "Cute",
    is_active: true,
    created_at: generateCreatedAt(0)
},
{
    id: 67,
    name: "Striped Zip Collar Top",
    price: 1299,
    originalPrice: 1899,
    category: "women",
    subcategory: "Tops",
    image_url: "./assets/images/womens_top_striped_zip.jpg",
    rating: 4.6,
    reviews: 187,
    description: "Made from quality fabric for all-day comfort. Features a simple design suitable for regular wear. Stylish striped knit top with zip collar.",
    features: ["Striped Knit", "Zip Collar", "Relaxed Fit", "Ribbed Texture", "Soft Yarn"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream/Black", "White/Navy", "Beige/Brown"],
    stock: 74,
    tag: "Cozy",
    is_active: true,
    created_at: generateCreatedAt(0)
}`;

// Replace the closing bracket with new products + closing bracket
content = content.replace(/\}\r?\n\];/, newProducts + '\n];');

// Write back to file
fs.writeFileSync('../src/frontend/js/products.js', content, 'utf8');
console.log('✅ Successfully added 5 new women\'s tops!');
