// src/component/Navbar/index.jsx
      import React, { useState, useEffect } from "react";
      import { Link } from "react-router-dom";
      import "./index.css"; // Changé de NavBar.css à index.css pour suivre votre convention de nommage

      function NavBar() {
        const [isActive, setIsActive] = useState(false);
        const [scrolled, setScrolled] = useState(false);

        useEffect(() => {
          const handleScroll = () => {
            setScrolled(window.scrollY > 50);
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        return (
          <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="logo-container">
              <Link to="/" className="logo">MonSite</Link>
            </div>

            <div className={`menu-toggle ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <ul className={`nav-links ${isActive ? "active" : ""}`}>
              <li><Link to="/" className="nav-link">Accueil</Link></li>
              <li><Link to="/about" className="nav-link">À propos</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
              <li>
                <Link to="/login" className="nav-btn login">Connexion</Link>
              </li>
              <li>
                <Link to="/register" className="nav-btn register">Inscription</Link>
              </li>
            </ul>
          </nav>
        );
      }

      export default NavBar;