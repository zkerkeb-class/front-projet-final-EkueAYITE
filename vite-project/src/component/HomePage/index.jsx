import React, {useState} from 'react';
import './index.css';
import {Link, useNavigate} from 'react-router-dom';
import GamingBackground from "../GamingBackground/index.jsx";
import axios from "axios";
import { useEffect } from "react";


const HomePage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // Vérifier si le token existe
        const token = localStorage.getItem("token");

        if (!token) {
            // Pas de token, rediriger vers login
            navigate("/login");
            return;
        }

        // Vérification du token avec fetch
        fetch('http://localhost:3000/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    // Si le token est invalide (401)
                    if (response.status === 401) {
                        throw new Error('Non autorisé');
                    }
                    throw new Error('Erreur réseau');
                }
                return response.json();
            })
            .then(data => {
                console.log('response', data);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                localStorage.removeItem("token");
                navigate("/login");
                setIsLoading(false);
            });
    }, [navigate]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }


    return (
    <>
        {isAuthenticated && (
            <div className="games-type-container">
                <Link to="/games/solo" className="charater-link" >
                    <img src="https://assets.codepen.io/1480814/goku-_1.png" alt="Jeux Solo"/>
                </Link>

                <Link to="/games/multi" className="character-link">
                    <img src="https://assets.codepen.io/1480814/veg-.png" alt="Jeux Multijoueur" />
                </Link>
            </div>
        )}
    </>
    );
};

export default HomePage;