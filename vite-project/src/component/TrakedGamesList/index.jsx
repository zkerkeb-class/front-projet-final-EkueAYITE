// src/components/TrackedGamesList/index.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const TrackedGamesList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrackedGames = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/games/tracking', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Erreur de chargement');

                const data = await response.json();
                setGames(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrackedGames();
    }, []);

    if (loading) return <div className="loading">Chargement...</div>;
    if (error) return <div className="error">Erreur : {error}</div>;

    return (
        <div className="tracked-games-container">
            <h2>Mes Jeux Suivis</h2>

            {games.length === 0 ? (
                <p>Aucun jeu suivi pour le moment.</p>
            ) : (
                <div className="games-grid">
                    {games.map((tracking) => (
                        <div
                            key={tracking._id}
                            className="game-card"
                            onClick={() => navigate(`/games/player/${tracking.gameId._id}`)}
                        >
                            <img
                                src={tracking.gameId.thumb}
                                alt={tracking.gameId.title}
                                className="game-image"
                            />
                            <div className="game-info">
                                <h3>{tracking.gameId.title}</h3>
                                <p>Status: {tracking.hasPlayed ? 'Joué' : 'Non joué'}</p>
                                {tracking.difficulty && (
                                    <p>Difficulté: {tracking.difficulty}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackedGamesList;