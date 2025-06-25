import {
    createBrowserRouter,
} from "react-router-dom";

import Login from "../component/Login";
import Register from "../component/Register";
import Layout from "../component/Layout";
import HomePage from "../component/HomePage/index.jsx";
import SoloGames from "../component/SoloGames/index.jsx";
import MultiPlayerGames from "../component/MultiPGames/index.jsx";
import GameDetail from "../component/GameDetail/index.jsx";


let router = createBrowserRouter([
        {
            path: "/",
            element: <Layout withGamingBackground={true} />,
            children: [
                {
                    index: true, // Page d'accueil
                    element: <HomePage />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                  path:"/games/solo",
                  element:<SoloGames/>
                },
                {
                    path:"/games/multi",
                    element:<MultiPlayerGames/>
                },
                {
                    path:"/games/player/:id",
                    element: <GameDetail/>
                }
            ]
        }
       /* {
            Component: Layout,
            children: [
                {
                    path: "/pokemon",
                    Component: PokemonPage,
                },
                {
                    path: "/pokemon/:id",
                    Component: PokemonDetailPage,
                }
            ]
        }*/
    ]

);

export default router;
