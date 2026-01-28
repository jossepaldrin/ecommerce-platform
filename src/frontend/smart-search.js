// Smart Search Logic for GAMMA E-Commerce
// Provides search suggestions and popular product recommendations

/**
 * Advanced search algorithm with scoring
 * @param {Array} products - The full product list
 * @param {String} query - The search query
 * @param {Number} limit - Max results to return
 */
function getSearchSuggestions(products, query, limit = 5) {
    if (!query || query.length < 2) return [];
    if (!products || !Array.isArray(products)) return [];

    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/);

    return products
        .map(product => {
            let score = 0;
            // Weighted fields
            const name = product.name ? product.name.toLowerCase() : "";
            const category = product.category ? product.category.toLowerCase() : "";
            const subcategory = product.subcategory ? product.subcategory.toLowerCase() : "";
            const description = product.description ? product.description.toLowerCase() : "";
            const tags = product.tag ? product.tag.toLowerCase() : "";
            const features = product.features ? product.features.join(" ").toLowerCase() : "";

            // 1. Exact Name Match (Highest Priority)
            if (name === lowerQuery) score += 100;

            // 2. Starts With Name
            if (name.startsWith(lowerQuery)) score += 80;

            // 3. Name Contains Query
            if (name.includes(lowerQuery)) score += 60;

            // 4. Category/Subcategory Matches
            if (category.includes(lowerQuery)) score += 40;
            if (subcategory.includes(lowerQuery)) score += 40;

            // 5. Keyword Matching (for multi-word queries)
            let matchesAllWords = true;
            queryWords.forEach(word => {
                let wordMatches = false;
                if (name.includes(word)) { score += 15; wordMatches = true; }
                if (category.includes(word)) { score += 10; wordMatches = true; }
                if (subcategory.includes(word)) { score += 10; wordMatches = true; }
                if (tags.includes(word)) { score += 8; wordMatches = true; }
                if (description.includes(word)) { score += 2; wordMatches = true; }
                if (features.includes(word)) { score += 2; wordMatches = true; }

                if (!wordMatches) matchesAllWords = false;
            });

            // Bonus for matching all words in query
            if (matchesAllWords && queryWords.length > 1) score += 30;

            // Bonus for high rating
            if (product.rating) score += product.rating;

            return { product, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.product);
}

/**
 * Get popular products based on tags and ratings
 * @param {Array} products - The full product list
 * @param {Number} limit - Max results
 */
function getPopularProducts(products, limit = 6) {
    if (!products || !Array.isArray(products)) return [];

    // Priority: Bestseller > Trending > High Rating
    return products
        .filter(p => p.tag === "Bestseller" || p.tag === "Trending" || p.rating >= 4.8)
        .sort((a, b) => {
            // Custom sort: Bestsellers first
            if (a.tag === "Bestseller" && b.tag !== "Bestseller") return -1;
            if (b.tag === "Bestseller" && a.tag !== "Bestseller") return 1;
            return b.rating - a.rating;
        })
        .slice(0, limit);
}
