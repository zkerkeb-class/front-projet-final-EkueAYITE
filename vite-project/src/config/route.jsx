import {
    createBrowserRouter,
} from "react-router-dom";

//import HomePage from "../component/HomePage";
import Login from "../component/Login";
import Register from "../component/Register";
import Layout from "../component/Layout";
import HomePage from "../component/HomePage/index.jsx";
//import PokemonDetailPage from "../screens/PokemonDetailPage";

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
