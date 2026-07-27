import { Link } from 'react-router';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="app-name">Sticky Sittuation</div>
        <Link to="/">Homepage</Link>
        <Link to="/boards">Boards</Link>
      </div>
      <div className="navbar-end">
        <a href="/">User Settings</a>
      </div>
    </div>
  );
}
export default Navbar;
