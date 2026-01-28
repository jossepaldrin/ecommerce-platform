const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/frontend/assets/images', 'shirst new');
const targetDir = path.join(__dirname, '../src/frontend/assets/images');
const productsFile = path.join(__dirname, '../src/frontend/js/products.js');

// Ensure source exists
if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    process.exit(1);
}

// Get list of images
const files = fs.readdirSync(sourceDir).filter(f => f.match(/\.(jpeg|jpg|png)$/i));

console.log(`Found ${files.length} images.`);

let currentId = 77;
let newProducts = '';

files.forEach((file, index) => {
    const ext = path.extname(file);
    const newFilename = `mens_shirt_${currentId}${ext}`;
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, newFilename);

    // Move/Rename file
    fs.copyFileSync(sourcePath, targetPath);
    // Optional: fs.unlinkSync(sourcePath); // removing original? Let's just copy for safety.

    // Create product entry
    const product = {
        id: currentId,
        name: `Premium Men's Shirt ${index + 1}`, // Generic name, can be updated later
        price: Math.floor(Math.random() * (2499 - 999) + 999),
        originalPrice: Math.floor(Math.random() * (3999 - 2599) + 2599),
        category: "men",
        subcategory: "Shirts",
        image_url: `./assets/images/${newFilename}`,
        rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
        reviews: Math.floor(Math.random() * 500),
        description: "Made from quality fabric for comfort and durability. Suitable for formal and casual wear.",
        features: ["Premium Cotton", "Regular Fit", "Breathable Fabric", "Easy Care", "Durable Stitching"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Various"], // Since we don't know the exact color without analysis
        stock: Math.floor(Math.random() * 100),
        tag: index % 3 === 0 ? "New" : (index % 3 === 1 ? "Trending" : "Classic"),
        is_active: true,
        created_at: `generateCreatedAt(0)` // Literal string for now, will replace in file write
    };

    // Format the object string
    const productStr = JSON.stringify(product, null, 4)
        .replace(/"created_at": "generateCreatedAt\(0\)"/g, 'created_at: generateCreatedAt(0)') // Fix function call
        .replace(/"key":/g, 'key:') // Optional: remove quotes from keys if we want to match style, but JSON is valid JS.
    // Actually, existing file uses unquoted keys mostly.
    // Let's just output valid JS object syntax manually or relax about keys.
    // The existing file uses: id: 67, name: "..."

    // Let's reconstruct the string to match style more closely
    const entry = `
{
    id: ${product.id},
    name: "${product.name}",
    price: ${product.price},
    originalPrice: ${product.originalPrice},
    category: "${product.category}",
    subcategory: "${product.subcategory}",
    image_url: "${product.image_url}",
    rating: ${product.rating},
    reviews: ${product.reviews},
    description: "${product.description}",
    features: ${JSON.stringify(product.features)},
    sizes: ${JSON.stringify(product.sizes)},
    colors: ${JSON.stringify(product.colors)},
    stock: ${product.stock},
    tag: "${product.tag}",
    is_active: true,
    created_at: generateCreatedAt(0)
}`;

    newProducts += entry + ',';
    currentId++;
});

// Remove trailing comma
if (newProducts.endsWith(',')) {
    newProducts = newProducts.slice(0, -1);
}

// Append to products.js
let content = fs.readFileSync(productsFile, 'utf8');
// Find the last closing bracket of the array
const lastBracketIndex = content.lastIndexOf('];');
if (lastBracketIndex !== -1) {
    const updatedContent = content.slice(0, lastBracketIndex) + ',' + newProducts + '\n];';
    fs.writeFileSync(productsFile, updatedContent, 'utf8');
    console.log('Successfully added products to catalog.');
} else {
    console.error('Could not find closing bracket of PRODUCTS array.');
}
