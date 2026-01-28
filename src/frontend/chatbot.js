// Chatbot Logic for GAMMA E-Commerce

const QUICK_ACTIONS = {
    track: {
        label: "Track Order",
        response: "To track your order, please provide your Order ID. You can find this in your confirmation email or order history."
    },
    return: {
        label: "Return Policy",
        response: "We offer a 30-day return policy for all unworn items with original tags. You can initiate a return through your account dashboard."
    },
    shipping: {
        label: "Shipping Info",
        response: "We offer free shipping on all orders over ₹1999. Standard delivery takes 3-5 business days. Express delivery is available at checkout."
    },
    contact: {
        label: "Contact Support",
        response: "You can reach our support team at support@gamma.com or call us at 1-800-GAMMA-HELP (Mon-Fri, 9am-6pm)."
    }
};

/**
 * Returns a time-sensitive welcome message
 */
function getWelcomeMessage() {
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour >= 5 && hour < 12) greeting = "Good Morning";
    else if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    else if (hour >= 17 && hour < 22) greeting = "Good Evening";

    return `${greeting}! I'm Gamma, your AI shopping assistant. How can I help you discover something amazing today?`;
}

/**
 * Generates a response based on user input
 * @param {String} message - User input message
 */
function getChatbotResponse(message) {
    if (!message) return "";

    const lowerMsg = message.toLowerCase();

    // Greeting
    if (lowerMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
        return "Hello there! Ready to explore our latest collection?";
    }

    // Product intents
    if (lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("looking for")) {
        return "I can certainly help! Are you interested in Men's Clothing, Women's Fashion, or Electronics?";
    }

    if (lowerMsg.includes("men")) {
        return "For men, we have great linen shirts, classic polos, and comfortable chinos. Check out our 'Men' category!";
    }

    if (lowerMsg.includes("women")) {
        return "Our women's collection features elegant tops, cozy sweaters, and summer linens. Perfect for any occasion!";
    }

    if (lowerMsg.includes("electronic") || lowerMsg.includes("gadget")) {
        return "Our electronics section is stocked with the latest iPhones, MacBooks, and Headphones. Don't miss our 'New Arrivals'!";
    }

    // Specific Items
    if (lowerMsg.includes("laptop") || lowerMsg.includes("macbook")) {
        return "We have the new MacBook Air M2 and MacBook Pro 14\". They are powerful and sleek. Would you like to check the specs?";
    }

    if (lowerMsg.includes("iphone") || lowerMsg.includes("mobile")) {
        return "The iPhone 13 Pro and the new iPhone 14 Pro are bestsellers right now. Great choice!";
    }

    // Price/Stock
    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("expensive")) {
        return "Our prices are competitive and tax-inclusive. You can see the price tag on every product card.";
    }

    if (lowerMsg.includes("stock") || lowerMsg.includes("available")) {
        return "Most items are in stock! If something is low on stock, we'll mark it as 'High Demand'.";
    }

    // Gratitude
    if (lowerMsg.includes("thank") || lowerMsg.includes("thanks")) {
        return "You're welcome! Happy shopping!";
    }

    // Default Fallback
    return "I'm mostly trained on our product catalog and policies. You can ask me about shipping, returns, or specific product categories!";
}
