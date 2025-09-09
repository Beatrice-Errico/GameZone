import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Homepage from "../view/Homepage";
import Register from "../view/Register";
import Login from "../view/login";

import { get_data, post_loader, games_by_genre_loader, platform_games_loader, year_games_loader, games_by_rating_loader, search_loader, register_loader, homepage_loader } from "../services/loader";
import Detail from "../view/Detail";
import GenrePage from "../view/filterspage/GenrePage";
import PlatformPage from "../view/filterspage/PlatformPage";
import YearPage from "../view/filterspage/YearPage";
import SearchPage from "../view/SearchPage";
import Account from "../view/Account"



const router = createBrowserRouter([
    {
        path: "/",
        Component : Layout,
        children: [
            {
                path: "/",
                Component: Homepage,
                loader: homepage_loader
            },
 
            {
                path: "/detail/:id/:slug",
                Component: Detail,
                loader: post_loader
            },
                        {
                path: "/games/:genre",
                Component: GenrePage,
                loader: games_by_genre_loader
            },
            {
                path: "/platform/:platformId",
                Component: PlatformPage, 
                loader: platform_games_loader 
            },
            {
                path: "/year/:year",
                Component: YearPage,
                loader: year_games_loader
            },
            {
                path: "/search",
                Component: SearchPage,
                loader: search_loader
            },
            {
                path: "/login",
                Component: Login,
                
            },
            {
                path: "/register",
                Component: Register,
                
            },
            {
                path: "/account",
                Component: Account,
                
            },
             {
                path: "/account",
                Component: Account,
                
            }


        ]
    }

]);
export default router; 