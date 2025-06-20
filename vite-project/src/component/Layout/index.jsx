// src/component/Layout/index.jsx
import React from 'react';
import './index.css'; // Assurez-vous que le fichier CSS est dans le même dossier
import GamingBackground from "../GamingBackground/index.jsx";
import NavBar from "../Navbar/index.jsx";
import {Outlet} from "react-router";


      // Version React du composant Layout
      function Layout({withGamingBackground = false}) {
        return (
          <div className="layout-container">
              {withGamingBackground && <GamingBackground/>}

             <NavBar/>

            <main className="content">
                <Outlet/>
            </main>

            <footer className="footer">
              {/* Pied de page si nécessaire */}
            </footer>
          </div>
        );
      }

      export default Layout;