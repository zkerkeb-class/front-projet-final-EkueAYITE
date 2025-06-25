// src/component/Login/index.css.jsx
import React from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import backgroundImage from '../../assets/fond/bg.jpg'; // Assurez-vous que le chemin est correct
import './index.css'; // Assurez-vous que le fichier CSS est dans le même dossier
import {useState, useEffect} from 'react';
import 'boxicons/css/boxicons.min.css';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Connexion réussie !\nToken : ${result.token}`);
        await localStorage.setItem("token", result.token);
        navigate("/");
        window.location.reload();
      } else {
        alert(result.message || "Erreur lors de la connexion");
      }
    } catch (err) {
      alert("Erreur réseau");
      console.error(err);
    }
  };
//todo : Ajouter le rafraîchissement de la page après la connexion réussie Afin d'avoir le bouton de déconnexion


  // Utilisez le style en ligne pour l'image de fond


  return (

      <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="remember-forgot">
            <label>
              <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
            <button type="submit" className="btn">Login</button>
            <div className="register-link">
              <p>Already have an account? <Link to="/register">Register</Link></p>
            </div>
          </form>
        </div>
  </div>
  );
}

export default Login;