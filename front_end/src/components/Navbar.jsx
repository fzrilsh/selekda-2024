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
            <li id="nav-link"><NavLink to="/blog">News</NavLink></li>
            <li id="nav-link"><NavLink to="/portfolio">Portfolio</NavLink></li>
            {
                user?.token ? <>
                    {
                        user.role === 'admin' ? <li id="nav-link"><NavLink to={'/admin'}>Admin Dashboard</NavLink></li> : <li id="nav-link"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    }
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
            <li><NavLink to="/blog">News</NavLink></li>
            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
            {
                user?.token ? <>
                    {
                        user.role === 'admin' ? <li><NavLink to={'/admin'}>Admin Dashboard</NavLink></li> : <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    }
                    <li><NavLink onClick={userLogout}>Logout</NavLink></li>
                </> : <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>
            }
        </ul>
    </nav>
}