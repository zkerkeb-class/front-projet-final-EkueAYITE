import React, { useEffect, useState } from "react";
                    import { useParams } from "react-router-dom";
                    import "./index.css";

                    const GameDetail = () => {
                        const { id } = useParams();
                        const [game, setGame] = useState(null);
                        const [loading, setLoading] = useState(true);
                        const [error, setError] = useState(null);

                        // États communs
                        const [hasPlayed, setHasPlayed] = useState(false);

                        // États pour les jeux solo
                        const [difficulty, setDifficulty] = useState(null); // 'easy', 'medium', 'hard'
                        const [gameProgress, setGameProgress] = useState(null); // 'in-progress', 'completed'
                        const [gameLevel, setGameLevel] = useState(1); // De 1 à 10

                        // États pour les jeux multijoueur
                        const [completionPercentage, setCompletionPercentage] = useState(0);

                        useEffect(() => {
                            console.log("ID récupéré:", id);

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
                                    console.log("Données du jeu reçues:", data);
                                    setGame(data);
                                    setLoading(false);
                                })
                                .catch((err) => {
                                    console.error("Erreur lors du chargement du jeu :", err);
                                    setError(err.message);
                                    setLoading(false);
                                });
                        }, [id]);

                        // Gestion du changement d'état "a déjà joué"
                        const handlePlayedChange = (e) => {
                            setHasPlayed(e.target.checked);
                        };

                        // Gestion des changements de difficulté
                        const handleDifficultyChange = (level) => {
                            setDifficulty(level);
                        };

                        // Gestion des changements de progression
                        const handleProgressChange = (progress) => {
                            setGameProgress(progress);
                            if (progress === 'completed') {
                                setGameLevel(10); // Si le jeu est terminé, on met le niveau au max
                            }
                        };

                        // Gestion du changement de niveau (1-10)
                        const handleLevelChange = (e) => {
                            const value = parseInt(e.target.value) || 1;
                            setGameLevel(Math.min(Math.max(value, 1), 10)); // Entre 1 et 10
                        };

                        // Affichages conditionnels
                        if (loading) return (
                            <div className="loading-container">
                                <div className="loading-spinner"></div>
                                <p className="loading-text">Chargement...</p>
                            </div>
                        );

                        if (error) return (
                            <div className="error-container">
                                <div className="error-icon">⚠️</div>
                                <p className="error-message">Erreur: {error}</p>
                            </div>
                        );

                        if (!game) return (
                            <div className="warning-container">
                                <div className="warning-icon">⚠️</div>
                                <p className="warning-message">Jeu non trouvé</p>
                            </div>
                        );


                        return (
                            <div className="game-detail">
                                <h2 className="game-title">{game?.title}</h2>
                                <div className="form-container">
                                    {/* Case à cocher commune pour indiquer si l'utilisateur a joué au jeu */}
                                    <div className="checkbox-container">
                                        <div className="custom-checkbox">
                                            <input
                                                type="checkbox"
                                                id="hasPlayed"
                                                checked={hasPlayed}
                                                onChange={handlePlayedChange}
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

                                {/* Sections spécifiques pour les jeux solo */}
                                    {/* Sections spécifiques pour les jeux solo */}
                                    {game.isSinglePlayer && hasPlayed && (
                                        <div className="single-player-section">
                                            {/* Niveau de difficulté */}
                                            <div className="checkbox-container">
                                                <h3 className="percentage-label" style={{ color: '#ff6b9d' }}>Niveau de difficulté</h3>
                                                <div className="radio-group" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                                    {['easy', 'medium', 'hard'].map((level, index) => (
                                                        <div key={level} className="custom-checkbox" style={{ flex: 1 }}>
                                                            <input
                                                                type="radio"
                                                                id={level}
                                                                name="difficulty"
                                                                value={level}
                                                                checked={difficulty === level}
                                                                onChange={() => handleDifficultyChange(level)}
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

                                            {/* Progression */}
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
                                                                onChange={() => handleProgressChange(option.id)}
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

                                            {/* Niveau de 1 à 10 */}
                                            <div className="percentage-container visible">
                                                <div className="percentage-content">
                                                    <span className="percentage-label">Niveau (1-10)</span>
                                                    <div className="percentage-controls">
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="10"
                                                            value={gameLevel}
                                                            onChange={handleLevelChange}
                                                            className="range-slider"
                                                        />
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="10"
                                                            value={gameLevel}
                                                            onChange={handleLevelChange}
                                                            className="number-input"
                                                        />
                                                    </div>
                                                    <div className="progress-bar-container">
                                                        <div className="progress-bar" style={{ width: `${(gameLevel/10)*100}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Options spécifiques pour les jeux multijoueur */}
                                    {game.isMultiplayer && hasPlayed && (
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
                                                            onChange={(e) => setCompletionPercentage(parseInt(e.target.value) || 0)}
                                                            className="range-slider"
                                                        />
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            value={completionPercentage}
                                                            onChange={(e) => setCompletionPercentage(parseInt(e.target.value) || 0)}
                                                            className="number-input"
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Bouton de sauvegarde */}
                                    {hasPlayed && (
                                        <div className="form-actions">
                                            <button className="save-button" type="button">
                                                <span className="button-text">Sauvegarder les informations</span>
                                            </button>
                                        </div>
                                        )}
                                </div>
                            </div>
                        );
                    };

                    export default GameDetail;