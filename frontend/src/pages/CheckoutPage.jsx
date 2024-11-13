import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CartContext } from '../context/CartContext';
import { PurchaseHistoryContext } from '../context/PurchaseHistoryContext';

function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const { addPurchase } = useContext(PurchaseHistoryContext);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        // Check if Stripe.js and Elements are loaded
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        // Step 1: Create a payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message); // Set the error message from Stripe
            setProcessing(false);
            return;
        }

        // Step 2: Send the cart data to the backend to create a payment intent
        const response = await fetch('http://127.0.0.1:5000/create_payment_intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }), // You can adjust this to send more specific data
        });

        const paymentResult = await response.json();

        if (paymentResult.error) {
            setError(paymentResult.error); // Handle the error returned from the backend
            setProcessing(false);
            return;
        }

        // Step 3: Confirm the payment on the frontend
        const { clientSecret } = paymentResult; // Get clientSecret from the backend

        const { error: confirmationError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id, // Use the created payment method
        });

        if (confirmationError) {
            setError(confirmationError.message); // Handle confirmation errors
        } else {
            setSucceeded(true); // Mark the payment as successful
            addPurchase(cart); // Process the purchase
            clearCart(); // Clear the cart after successful payment
        }

        setProcessing(false); // Finish processing
    };


    // CardElement styling options
    const cardElementOptions = {
        style: {
            base: {
                color: '#ffffff', // White text for card details
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'Roboto, sans-serif',
                '::placeholder': {
                    color: '#ffdd44', // Bright yellow for placeholder
                },
                iconColor: '#ffdd44', // Icon color to match placeholder
            },
            invalid: {
                color: '#ff8b42', // Orange color for errors
            },
        },
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            {cart.length > 0 ? (
                <div>
                    <ul className="cart-item-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <p>{item.title}</p>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="total-amount">Total: ${totalAmount.toFixed(2)}</p>
                    <form onSubmit={handleSubmit}>
                        {/* Pass the styling options to CardElement */}
                        <CardElement options={cardElementOptions} />
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" disabled={!stripe || processing}>
                            {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                        </button>
                        {succeeded && (
                            <div className="success-message">
                                <p>Payment succeeded! Thank you for your purchase.</p>
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default CheckoutPage;
