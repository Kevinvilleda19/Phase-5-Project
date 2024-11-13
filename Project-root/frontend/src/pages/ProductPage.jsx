import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/data'; // Import the products from data.js
import Modal from '../components/Modal';
import ModelViewer from '../components/ModelViewer'; // Import the ModelViewer component
import { CartContext } from '../context/CartContext'; // Import the CartContext
import { toast } from 'react-toastify'; // Import toast for notifications

// Mock Reviews based on Product ID
const mockReviews = {
  1: [
    { id: 1, username: "JaneDoe", rating: 5, text: "Absolutely love this backpack! Perfect for my daily use." },
    { id: 2, username: "JohnSmith", rating: 4, text: "Great quality and very spacious!" },
  ],
  2: [
    { id: 3, username: "Traveler", rating: 5, text: "Fits perfectly! The fabric is so soft." },
    { id: 4, username: "HappyBuyer", rating: 4, text: "Good value for the price, very comfortable." },
  ],
  3: [
    { id: 5, username: "OutdoorFan", rating: 4, text: "Good jacket for the price, keeps me warm!" },
    { id: 6, username: "NatureLover", rating: 5, text: "Perfect for hiking in cooler weather!" },
  ],
  4: [
    { id: 7, username: "DesignLover", rating: 5, text: "This dresser is stunning and fits perfectly!" },
    { id: 8, username: "HomeDecorator", rating: 4, text: "Very stylish and functional, but a bit small." },
  ],
  5: [
    { id: 9, username: "GamerDude", rating: 5, text: "Amazing monitor! The colors are vibrant and the size is perfect." },
    { id: 10, username: "TechSavvy", rating: 4, text: "Great performance for gaming, but it took a while to set up." },
  ],
  6: [
    { id: 11, username: "Fashionista", rating: 5, text: "The perfect denim shirt! I wear it all the time." },
    { id: 12, username: "StyleSeeker", rating: 4, text: "Classic and versatile, great for layering!" },
  ],
  7: [
    { id: 13, username: "ChicStyle", rating: 5, text: "This jacket is stylish and fits like a glove!" },
    { id: 14, username: "ComfortQueen", rating: 4, text: "Great quality leather, very comfortable." },
  ],
  8: [
    { id: 15, username: "GemLover", rating: 5, text: "This ring is absolutely stunning! Love it!" },
    { id: 16, username: "GiftGiver", rating: 5, text: "I bought this as a gift, and it was a hit!" },
  ],
  9: [
    { id: 17, username: "WatchEnthusiast", rating: 5, text: "Beautiful design, very elegant watch!" },
    { id: 18, username: "FashionLover", rating: 5, text: "Great watch for the price, looks expensive!" },
  ],
};

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext); // Get addToCart from context
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Find the product by ID from the imported products array
    const foundProduct = products.find(prod => prod.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError("Product not found.");
    }
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const productReviews = mockReviews[id] || [];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to the cart
      toast.success(`${product.title} has been added to your cart!`); // Show a success toast notification
    }
  };

  const handleARMode = () => {
    if (product && product.arModel) {
      window.location.href = `ar.html?model=${encodeURIComponent(product.arModel)}`; // Redirect to AR view
    } else {
      toast.error("This product does not have an AR model available.");
    }
  };

  return product ? (
    <div className="product-page">
      <div className="product-container">
        {/* Product Image */}
        <div className="product-image-large" onClick={openModal} style={{ cursor: 'pointer' }}>
          <img src={product.image} alt={product.title} />
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="product-title-large">{product.title}</h1>
          <p className="product-category">{product.category.toUpperCase()}</p>
          <p className="product-price-large">${product.price}</p>
          <p className="product-description">{product.description}</p>

          {/* Add to Cart Button with Functionality */}
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>

          {/* AR Mode Button */}
          <button className="ar-mode-button" onClick={handleARMode}>AR Mode</button>
        </div>
      </div>

      {/* Reviews Section Under Product */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        {productReviews.length > 0 ? (
          productReviews.map((review) => (
            <div key={review.id} className="review">
              <p className="review-username">{review.username}</p>
              <p className="review-rating">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
              <p className="review-text">{review.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </div>

      {/* Modal for 3D Model Viewer */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModelViewer modelUrl={product.modelUrl} imageUrl={product.image} title={product.title} />
        </Modal>
      )}
      {error && <p className="error-message">{error}</p>} {/* Error message display */}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProductPage;
