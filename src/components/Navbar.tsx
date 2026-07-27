import '../styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="app-name">Sticky Sittuation</div>
        <a href="/">Homepage</a>
        <a href="/">Boards</a>
      </div>
      <div className="navbar-end">
        <a href="/">User Settings</a>
      </div>
    </div>
  );
}
export default Navbar;
