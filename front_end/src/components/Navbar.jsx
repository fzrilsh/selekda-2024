import { NavLink } from "react-router-dom";

export default function Navbar(){
    return <nav>
        <ul>
            <li><img src="/Computer_Logo.png" alt="Logo" /></li>
            <li id="nav-link"><NavLink to="/#gallery">Gallery</NavLink></li>
            <li id="nav-link"><NavLink to="/#services">Services</NavLink></li>
            <li id="nav-link"><NavLink to="/#portfolio">Portfolio</NavLink></li>
            <li id="nav-link"><NavLink to="/#">News</NavLink></li>
            <li id="nav-link"><NavLink to="/#">Testimonials</NavLink></li>
            <li id="nav-link"><NavLink to="/login">Login</NavLink></li>
            <li id="open">Open</li>
        </ul>

        <ul className="sidebar">
            <li id="close">X</li>
            <li><NavLink to="/#gallery">Gallery</NavLink></li>
            <li><NavLink to="/#services">Services</NavLink></li>
            <li><NavLink to="/#portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/#">News</NavLink></li>
            <li><NavLink to="/#">Testimonials</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    </nav>
}