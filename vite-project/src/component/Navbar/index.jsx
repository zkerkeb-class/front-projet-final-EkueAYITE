// src/component/Navbar/index.css.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Changé de NavBar.css à index.css.css pour suivre votre convention de nommage
import { useNavigate } from "react-router-dom";

      function NavBar() {
        const [isActive, setIsActive] = useState(false);
        const [scrolled, setScrolled] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
        const navigate = useNavigate();

        useEffect(() => {
          const handleScroll = () => {
            setScrolled(window.scrollY > 50);
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);
          const handleLogout = async () => {
              try {
                  const token = localStorage.getItem("token");

                  // Appel à votre API de déconnexion
                  const response = await fetch('http://localhost:3000/api/logout', {
                      method: 'POST',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                      }
                  });

                  // Même si la requête échoue, on supprime le token côté client
                  localStorage.removeItem("token");
                  setIsAuthenticated(false);
                  navigate("/login");

              } catch (error) {
                  console.error("Erreur lors de la déconnexion:", error);
                  // On supprime quand même le token en cas d'erreur
                  localStorage.removeItem("token");
                  setIsAuthenticated(false);
                  navigate("/login");
              }
          };

        return (
          <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="logo-container">
              <Link to="/" className="logo">GAMEHUB</Link>
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
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/login" className="nav-btn login">Connexion</Link></li>
                        <li><Link to="/register" className="nav-btn register">Inscription</Link></li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="nav-btn register">Déconnexion</button>
                    </li>
                )}
            </ul>
          </nav>
        );
      }

      export default NavBar;