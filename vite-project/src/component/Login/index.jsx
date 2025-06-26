// vite-project/src/component/Login/index.jsx
  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { useTranslation } from 'react-i18next';
  import backgroundImage from '../../assets/fond/bg.jpg';
  import 'boxicons/css/boxicons.min.css';
  import './index.css';

  function Login() {
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        if (response.ok) {
          alert(t('login.success', { token: result.token }));
          localStorage.setItem('token', result.token);
          navigate('/');
          window.location.reload();
        } else {
          alert(result.message || t('login.error'));
        }
      } catch (err) {
        alert(t('login.networkError'));
        console.error(err);
      }
    };

    return (
      <div
        className="login-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>{t('login.title')}</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder={t('login.usernamePlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder={t('login.passwordPlaceholder')}
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
                {t('login.rememberMe')}
              </label>
              <a href="#">{t('login.forgotPassword')}</a>
            </div>

            <button type="submit" className="btn">
              {t('login.submit')}
            </button>

            <div className="register-link">
              <p>
                {t('login.noAccount')} <Link to="/register">{t('login.register')}</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  export default Login;