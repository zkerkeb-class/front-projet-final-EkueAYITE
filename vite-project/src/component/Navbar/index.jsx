// src/component/Navbar/index.css.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Changé de NavBar.css à index.css.css pour suivre votre convention de nommage
import { useNavigate } from "react-router-dom";
import"../../config/i18n"; // Assurez-vous que ce chemin est correct
import { useTranslation } from "react-i18next";

      function NavBar() {
        const [isActive, setIsActive] = useState(false);
        const [scrolled, setScrolled] = useState(false);
        const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
        const navigate = useNavigate();
        const { t, i18n } = useTranslation();

          // Fonction pour changer la langue
          const changeLanguage = (lang) => {
              i18n.changeLanguage(lang);
          };

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
              <div className="language-selector">
                  <h2>{t("gameTitle")}</h2>
                  <button className="nav-btn" onClick={() => changeLanguage("fr")}>Français</button>
                  <button className="nav-btn" onClick={() => changeLanguage("en")}>English</button>
              </div>
            <div className={`menu-toggle ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={`nav-links ${isActive ? "active" : ""}`}>
              <li><Link to="/" className="nav-link">Accueil</Link></li>
              <li><Link to="/my-tracked-games" className="nav-link">Mes jeux suivis</Link></li>
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