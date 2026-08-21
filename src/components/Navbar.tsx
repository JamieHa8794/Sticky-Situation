import { Link, useMatch } from 'react-router';

import Logo from '../assets/Logo.png';
import '../styles/layout/Navbar.css';
import { Grid2X2, Home } from 'lucide-react';

function Navbar() {
  const isHome = Boolean(useMatch('/'));
  const isBoards = Boolean(useMatch('/boards'));

  return (
    <div className="navbar">
      <div className="navbar-start">
        <Link to="/" className="home-logo-link">
          <div className="navbar-logo">
            <img src={Logo} className="icon xl" />
            <div className="app-name">Sticky Situation</div>
          </div>
        </Link>
        <div className="navbar-link-container">
          <Link to="/" className={`navbar-link ${isHome ? 'active' : ''}`}>
            <Home className="icon lg" />
            <div>Home</div>
          </Link>
          <Link
            to="/boards"
            className={`navbar-link ${isBoards ? 'active' : ''}`}
          >
            <Grid2X2 className="icon lg" />
            <div>Boards</div>
          </Link>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
export default Navbar;
