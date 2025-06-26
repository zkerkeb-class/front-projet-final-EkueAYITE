import React, { useEffect, useState} from "react";
import { useParams, useNavigate  } from "react-router-dom";
import "./index.css";

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Debug pour vérifier l'ID
    console.log("ID from useParams:", id);
    console.log("Type of ID:", typeof id);

    // États communs - Initialisation à null pour éviter les faux positifs
    const [hasPlayed, setHasPlayed] = useState(null);

    // États pour les jeux solo
    const [difficulty, setDifficulty] = useState(null);
    const [gameProgress, setGameProgress] = useState(null);
    const [gameLevel, setGameLevel] = useState(1);

    // États pour les jeux multijoueur
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        // Vérifier que l'ID existe avant de faire le fetch
        if (!id) {
            setError("ID du jeu manquant");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:3000/api/games/player/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur ${res.status}: Jeu non trouvé`);
                }
                return res.json();
            })
            .then((data) => {
                setGame(data);
                // Mise à jour explicite de hasPlayed avec une valeur booléenne
                setHasPlayed(Boolean(data.hasPlayed));
                setDifficulty(data.difficulty || null);
                setGameProgress(data.gameProgress || null);
                setGameLevel(data.gameLevel || 1);
                setCompletionPercentage(data.completionPercentage || 0);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleSave = () => {
        const updatedData = {
            difficulty,
            gameProgress,
            gameLevel,
            completionPercentage,
            hasPlayed: Boolean(hasPlayed) // S'assurer que c'est un booléen
        };

        fetch(`http://localhost:3000/api/games/traking/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(updatedData)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erreur ${res.status}: Échec de la mise à jour`);
                }
                return res.json();
            })
            .then(() => {
                alert("Les informations ont été sauvegardées avec succès !");
            })
            .catch(() => {
                alert("Une erreur est survenue lors de la sauvegarde.");
            });
    };

    // Gestion du changement de hasPlayed avec réinitialisation des autres états
    const handleHasPlayedChange = (checked) => {
        setHasPlayed(checked);

        // Réinitialiser les autres états quand on décoche "Déjà joué"
        if (!checked) {
            setDifficulty(null);
            setGameProgress(null);
            setGameLevel(1);
            setCompletionPercentage(0);
        }
    };
    const handleGoToTracking = () => {
        navigate(`/my-tracked-games`);
    };


    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur: {error}</p>;
    if (!game) return <p>Jeu non trouvé</p>;

    return (
        <div className="game-detail">
            <h2 className="game-title">{game.title}</h2>
            <div className="form-container">
                <div className="checkbox-container">
                    <div className="custom-checkbox">
                        <input
                            type="checkbox"
                            id="hasPlayed"
                            checked={hasPlayed === true} // Comparaison explicite
                            onChange={(e) => handleHasPlayedChange(e.target.checked)}
                            className="checkbox-input"
                        />
                        <label htmlFor="hasPlayed" className="checkbox-label">
                            <div className={`checkbox-box ${hasPlayed ? 'checked' : ''}`}>
                                {hasPlayed && (
                                    <svg className="checkmark" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                )}
                            </div>
                            <span className={`checkbox-text ${hasPlayed ? 'completed-text' : ''}`}>
                                Déjà joué ?
                            </span>
                        </label>
                    </div>
                </div>

                {/* Affichage conditionnel uniquement si hasPlayed est true */}
                {hasPlayed === true && game.isSinglePlayer && (
                    <div className="single-player-section">
                        <div className="checkbox-container">
                            <h3 className="percentage-label" style={{ color: '#ff6b9d' }}>Niveau de difficulté</h3>
                            <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                {['easy', 'medium', 'hard'].map((level) => (
                                    <div key={level} className="custom-checkbox" style={{ flex: 1 }}>
                                        <input
                                            type="radio"
                                            id={level}
                                            name="difficulty"
                                            value={level}
                                            checked={difficulty === level}
                                            onChange={() => setDifficulty(level)}
                                            className="checkbox-input"
                                        />
                                        <label htmlFor={level} className="checkbox-label">
                                            <div className={`checkbox-box ${difficulty === level ? 'checked' : ''}`}
                                                 style={{ borderRadius: '50%' }}>
                                                {difficulty === level && (
                                                    <span className="checkmark">✓</span>
                                                )}
                                            </div>
                                            <span className={`checkbox-text ${difficulty === level ? 'completed-text' : ''}`}>
                                                {level === 'easy' ? 'Facile' : level === 'medium' ? 'Moyen' : 'Difficile'}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="checkbox-container">
                            <h3 className="percentage-label" style={{ color: '#8b45ff' }}>Progression</h3>
                            <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                {[{ id: 'in-progress', label: 'En cours' }, { id: 'completed', label: 'Jeu terminé' }].map((option) => (
                                    <div key={option.id} className="custom-checkbox" style={{ flex: 1 }}>
                                        <input
                                            type="radio"
                                            id={option.id}
                                            name="progress"
                                            value={option.id}
                                            checked={gameProgress === option.id}
                                            onChange={() => setGameProgress(option.id)}
                                            className="checkbox-input"
                                        />
                                        <label htmlFor={option.id} className="checkbox-label">
                                            <div className={`checkbox-box ${gameProgress === option.id ? 'checked' : ''}`}
                                                 style={{ borderRadius: '50%' }}>
                                                {gameProgress === option.id && (
                                                    <span className="checkmark">✓</span>
                                                )}
                                            </div>
                                            <span className={`checkbox-text ${gameProgress === option.id ? 'completed-text' : ''}`}>
                                                {option.label}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="percentage-container visible">
                            <div className="percentage-content">
                                <span className="percentage-label">Niveau (1-10)</span>
                                <div className="percentage-controls">
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={gameLevel}
                                        onChange={(e) => setGameLevel(parseInt(e.target.value))}
                                        className="range-slider"
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={gameLevel}
                                        onChange={(e) => setGameLevel(parseInt(e.target.value))}
                                        className="number-input"
                                    />
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${(gameLevel / 10) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {hasPlayed === true && game.isMultiplayer && (
                    <div className="multiplayer-section">
                        <div className="percentage-container visible">
                            <div className="percentage-content">
                                <span className="percentage-label">Où estimes-tu ton niveau ?</span>
                                <div className="percentage-controls">
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={completionPercentage}
                                        onChange={(e) => setCompletionPercentage(parseInt(e.target.value))}
                                        className="range-slider"
                                    />
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={completionPercentage}
                                        onChange={(e) => setCompletionPercentage(parseInt(e.target.value))}
                                        className="number-input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {hasPlayed === true && (
                    <div className="form-actions">
                        <button onClick={handleSave} className="save-button" type="button">
                            <span className="button-text">Sauvegarder les informations</span>
                        </button>
                        <br/>
                        <br/>
                        <button onClick={handleGoToTracking} className="save-button" type="button">
                            <span className="button-text">Voir le suivi</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameDetail;