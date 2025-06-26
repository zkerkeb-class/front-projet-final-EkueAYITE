import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

            const MultiPlayerGames = () => {
                const navigate = useNavigate();
                const [games, setGames] = useState([]);
                const [visibleGames, setVisibleGames] = useState([]);
                const [currentIndex, setCurrentIndex] = useState(0);
                const [loading, setLoading] = useState(true);
                const GAMES_PER_PAGE = 6; // Nombre de jeux à afficher par page

                const [error, setError] = useState(null);

                useEffect(() => {
                    fetch("http://localhost:3000/api/games/multiplayer", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                        .then((res) => {
                            if (!res.ok) throw new Error(`Jeu non trouvé (${res.status})`);
                            return res.json();
                        })
                        .then((data) => {
                            const multiGames = data.filter((game) => game.isMultiplayer);
                            setGames(multiGames);
                            setVisibleGames(multiGames.slice(0, GAMES_PER_PAGE));
                            setCurrentIndex(GAMES_PER_PAGE);
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.error("Erreur lors du chargement des jeux :", err);
                            setError(err.message);
                            setLoading(false);
                        });
                }, []);

                const loadMore = () => {
                    const nextIndex = currentIndex + GAMES_PER_PAGE;
                    setVisibleGames(games.slice(0, nextIndex));
                    setCurrentIndex(nextIndex);
                };

                if (loading) {
                    return <p>Chargement des jeux multijoueur...</p>;
                }
                console.log(visibleGames)
                return (
                    <div className="games-scroll-wrapper">
                        <h2>Jeux Multijoueur</h2>
                        <div className="games-container">
                            {visibleGames.map((game) => (

                                <div  key={game._id}
                                      className="game-card"
                                      onClick={() => navigate(`/games/player/${game._id}`)}
                                      style={{ cursor: 'pointer' }}
                                >
                                    <img src={game.thumb} alt={game.title} className="game-img" />
                                    <div className="game-card-content">
                                        <h3>{game.title}</h3>
                                        <p><strong>Note Metacritic :</strong> {game.metacriticScore}</p>
                                        <p><strong>Évaluation Steam :</strong> {game.steamRatingText} ({game.steamRatingPercent}%)</p>
                                        <p><strong>Prix :</strong> {game.salePrice}€ (au lieu de {game.normalPrice}€)</p>
                                        <p><strong>Note de la promo :</strong> {game.dealRating}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                        {currentIndex < games.length && (
                            <button onClick={loadMore} style={{ marginTop: '1rem' }} className="btn">Voir plus</button>
                        )}
                    </div>
                );
            };

            export default MultiPlayerGames;