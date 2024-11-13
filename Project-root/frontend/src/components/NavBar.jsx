import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

function NavBar() {
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`); // Redirect to home with search query
      setSearchTerm(''); // Clear the input field after search
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Home</Link>
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/checkout" className="cart-icon">
        🛒
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </Link>
    </nav>
  );
}

export default NavBar;
