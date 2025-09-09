import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ScrollTop from "../ScrollTop";

export default function Layout() {
    return (
        <>
        <ScrollTop />
        <Navbar />
        <Outlet />
        <Footer />
        </>
        
    );
}