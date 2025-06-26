// src/component/Navbar/index.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import "../../config/i18n";
import { useTranslation } from "react-i18next";

function NavBar() {
    const { t, i18n } = useTranslation();
    const [isActive, setIsActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value);
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
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        } finally {
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
                <label htmlFor="language-select">{t("language")}:</label>
                <select id="language-select" onChange={handleLanguageChange} value={i18n.language}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                </select>
            </div>

            <div className={`menu-toggle ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>
                <span></span><span></span><span></span>
            </div>

            <ul className={`nav-links ${isActive ? "active" : ""}`}>
                <li><Link to="/" className="nav-link">{t("home")}</Link></li>
                <li><Link to="/my-tracked-games" className="nav-link">{t("myTrackedGames")}</Link></li>
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/login" className="nav-btn login">{t("login")}</Link></li>
                        <li><Link to="/register" className="nav-btn register">{t("register")}</Link></li>
                    </>
                ) : (
                    <li><button onClick={handleLogout} className="nav-btn register">{t("logout")}</button></li>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
