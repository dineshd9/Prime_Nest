import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <div className="navbar__logo">PrimeNest</div>
      {/* <div className="navbar__menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`navbar__links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#property">Property</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
