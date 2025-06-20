import React from 'react';
import './index.css';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                navigate("/login");
            } else {
                alert(result.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            alert("Erreur réseau");
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Inscription</h1>
                    <div className="input-box">
                        <input type="text" name="username" placeholder="Nom d'utilisateur" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Mot de passe" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <button type="submit" className="btn">S'inscrire</button>
                    <div className="login-register">
                        <p>Vous avez déjà un compte? <Link to="/login">Connexion</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;