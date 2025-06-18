// src/component/Layout/index.jsx
      import React from 'react';
        import './index.css'; // Assurez-vous que le fichier CSS est dans le même dossier
      import Login from '../Login/index.jsx';
import NavBar from "../Navbar/index.jsx";
import {Outlet} from "react-router";


      // Version React du composant Layout
      function Layout() {
        return (
          <div className="app-container">
            <header className="app-header">
             <NavBar/>
            </header>

            <main className="app-content">
               <Outlet/>
            </main>

            <footer className="app-footer">
              {/* Pied de page si nécessaire */}
            </footer>
          </div>
        );
      }

      export default Layout;