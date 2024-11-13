import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './context/CartContext';
import { PurchaseHistoryProvider } from './context/PurchaseHistoryContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  return (
    <CartProvider>
      <PurchaseHistoryProvider>
        <Router>
          <NavBar />
          <Elements stripe={stripePromise}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Elements>
        </Router>
      </PurchaseHistoryProvider>
    </CartProvider>
  );
}

export default App;
