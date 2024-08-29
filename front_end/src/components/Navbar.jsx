import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

export default function Navbar(){
    const {user, logout} = useAuth()
    const {fetch} = useFetch()

    const userLogout = () => {
        fetch({ method: 'get', path: '/logout' })
        logout()
    }

    return <nav>
        <ul>
            <li><NavLink to={'/'}><img src="/Computer_Logo.png" alt="Logo" /></NavLink></li>
            <li id="nav-link"><NavLink to="/#gallery">Gallery</NavLink></li>
            <li id="nav-link"><NavLink to="/#services">Services</NavLink></li>
            <li id="nav-link"><NavLink to="/#portfolio">Portfolio</NavLink></li>
            <li id="nav-link"><NavLink to="/#">News</NavLink></li>
            <li id="nav-link"><NavLink to="/#">Testimonials</NavLink></li>
            {
                user?.token ? <>
                    <li id="nav-link"><NavLink to={import.meta.env.VITE_SERVER_BASE_URL+'/game'}>Game</NavLink></li>
                    <li id="nav-link"><NavLink to={import.meta.env.VITE_SERVER_BASE_URL+'/dsgn'}>DSGN</NavLink></li>
                    <li id="nav-link"><NavLink onClick={userLogout}>Logout</NavLink></li>
                </> : <>
                    <li id="nav-link"><NavLink to="/login">Login</NavLink></li>
                    <li id="nav-link"><NavLink to="/register">Register</NavLink></li>
                </>
            }
            <li id="open">Open</li>
        </ul>

        <ul className="sidebar">
            <li id="close">X</li>
            <li><NavLink to="/#gallery">Gallery</NavLink></li>
            <li><NavLink to="/#services">Services</NavLink></li>
            <li><NavLink to="/#portfolio">Portfolio</NavLink></li>
            <li><NavLink to="/#">News</NavLink></li>
            <li><NavLink to="/#">Testimonials</NavLink></li>
            {
                user?.token ? <>
                    <li><NavLink to={import.meta.env.VITE_SERVER_BASE_URL+'/game'}>Play Game</NavLink></li>
                    <li><NavLink to={import.meta.env.VITE_SERVER_BASE_URL+'/dsgn'}>DSGN</NavLink></li>
                    <li><NavLink onClick={userLogout}>Logout</NavLink></li>
                </> : <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>
            }
        </ul>
    </nav>
}