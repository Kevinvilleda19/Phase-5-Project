// src/data/data.js
const products = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.",
        category: "Accessories",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
            rate: 3.9,
            count: 120
        }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, light weight & soft fabric for breathable and comfortable wearing.",
        category: "Men's Clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: {
            rate: 4.1,
            count: 259
        }
    },
    {
        id: 3,
        title: "Mens Cotton Jacket",
        price: 55.99,
        description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.",
        category: "Men's Clothing",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        rating: {
            rate: 4.7,
            count: 500
        }
    },
    {
    id: 4,
        title: "Elegant Small Nightstand Dresser",
        description: "Enhance your bedroom decor with our Elegant Small Nightstand Dresser, a perfect blend of style and functionality. Crafted from high-quality materials, this compact dresser features a sleek design that fits seamlessly into any space, making it ideal for smaller rooms or as an accent piece in larger settings.",
        price: 199.99,
        image: "https://i.postimg.cc/65zVzp84/dresser-picture.jpg",
        category: "Furniture",
        rating: {
            rate: 4.1,
            count: 240
        },
        modelUrl: "/models/trim_sheet__example_dresser%20%281%29.glb",
        arModel: "/models/trim_sheet__example_dresser%20%281%29.glb"
    },
    {
        id: 5,
        title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
        description: "Immerse yourself in the action with the Samsung 49-Inch CHG90 curved gaming monitor. This ultra-wide monitor provides stunning visuals and an ultra-responsive 144Hz refresh rate, perfect for gaming and multitasking. With a resolution of 3840 x 1080, you can experience a panoramic view like never before.",
        price: 999.99,
        image: "https://i.postimg.cc/TYy7yb7Y/Monitor.jpg",
        category: "Electronics",
        rating: {
            rate: 4.7,
            count: 150
        },
        modelUrl: "/models/ultrawide_monitor.glb", // Link to the model file for the ultrawide monitor
        arModel: "/models/ultrawide_monitor.glb" // AR Model path
    },
    {
        id: 6,
        title: "Classic Denim Shirt",
        description: "This classic denim shirt is a versatile wardrobe essential. Crafted from durable denim, it features a timeless design with a button-down front, chest pockets, and a relaxed fit that pairs perfectly with any outfit. Perfect for casual outings or layered looks.",
        price: 49.99,
        image: "https://i.postimg.cc/nLTCfXtq/Denim-shirt.jpg", // Replace with the actual image URL for the denim shirt
        category: "Clothing",
        rating: {
            rate: 4.5,
            count: 200
        },
        modelUrl: "/models/denim_shirt.glb", // Link to the model file for the denim shirt
        arModel: "/models/denim_shirt.glb" // AR Model path
    },
    {
        id: 7,
        title: "Stylish Women's Leather Jacket",
        description: "This stylish women's leather jacket combines sophistication and edge, making it the perfect addition to any wardrobe. Crafted from high-quality leather, it features a fitted design, zippered pockets, and a classic collar for a timeless look. Ideal for both casual and formal occasions.",
        price: 149.99,
        image: "https://i.postimg.cc/xddbCv56/Women-leather-jacket.jpg", // Replace with the actual image URL for the leather jacket
        category: "Women's Clothing",
        rating: {
            rate: 4.6,
            count: 180
        },
        modelUrl: "/models/womens_leather_jacket.glb", // Link to the model file for the women's leather jacket
        arModel: "/models/womens_leather_jacket.glb" // AR Model path
    },
    {
        id: 8, // Ensure this ID is unique and does not conflict with existing IDs
        title: "Elegant Black Stone Diamond Ring",
        description: "This stunning black stone diamond ring features a unique design that captures elegance and sophistication. Crafted with high-quality materials, this ring is perfect for special occasions or as a luxurious gift. The striking contrast of the black stone against the diamond accents creates a timeless piece that complements any outfit.",
        price: 299.99,
        image: "https://i.postimg.cc/1XD8TJR3/Black-stone-ring.jpg", // Replace with the actual image URL for the ring
        category: "Jewelry",
        rating: {
            rate: 5.0,
            count: 220
        },
        modelUrl: "/models/Black_Stone_Ring.glb",
        arModel: "/models/Black_Stone_Ring.glb" // Link to the model file for the black stone diamond ring
    },
    {
        id: 9, // Ensure this ID is unique and does not conflict with existing IDs
        title: "Elegant Gold and Black Watch",
        description: "This stunning watch features a stylish gold case with a black dial, making it a perfect accessory for any outfit. Designed with precision and elegance, it combines modern aesthetics with functionality. The intricate mechanical design of the watch's face is sure to impress, making it ideal for both casual and formal occasions.",
        price: 149.99,
        image: "https://i.postimg.cc/bNzTV5vv/Watch.jpg", // Replace with the actual image URL for the watch
        category: "Accessories",
        rating: {
            rate: 4.5,
            count: 120
        },
        modelUrl: "/models/watch.glb",
        arModel: "/models/watch.glb" // Link to the model file for the watch
    },
];

export default products;
