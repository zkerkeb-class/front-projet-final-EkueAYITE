import React, { useEffect, useState } from "react";
import './SoloGames.css'; // Tu peux styliser ici

const SoloGames = () => {
    const [soloGames, setSoloGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/games') // Remplace par ton vrai endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des jeux.");
                }
                return response.json();
            })
            .then(data => {
                const filteredGames = data.filter(game => game.isSinglePlayer);
                setSoloGames(filteredGames);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Impossible de charger les jeux solo.");
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Chargement des jeux solo...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="games-container">
            <h1>Jeux Solo Disponibles</h1>
            <div className="games-grid">
                {soloGames.map(game => (
                    <div key={game.gameID} className="game-card">
                        <img src={game.thumb} alt={game.title} />
                        <h3>{game.title}</h3>
                        <p>Prix : {game.salePrice}€ (au lieu de {game.normalPrice}€)</p>
                        <p>Note Steam : {game.steamRatingText} ({game.steamRatingPercent}%)</p>
                        <a href={`https://store.steampowered.com/app/${game.steamAppID}`} target="_blank" rel="noreferrer">
                            Voir sur Steam
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoloGames;
