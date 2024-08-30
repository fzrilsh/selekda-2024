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
            {
                !user?.token && <>
                    <li id="nav-link"><NavLink to="/login">Login</NavLink></li>
                    <li id="nav-link"><NavLink to="/register">Register</NavLink></li>
                </>
            }
            {
                user?.token && <>
                    {
                        user.role === 'user' && <>
                            <li id="nav-link"><NavLink to="/blog">News</NavLink></li>
                            <li id="nav-link"><NavLink to="/portfolio">Portfolio</NavLink></li>
                            <li id="nav-link"><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                        </>
                    }
                    {
                        user.role === 'admin' && <>
                            <li id="nav-link"><input type="text" placeholder="Search..." /></li>
                            <li id="nav-link"><NavLink to="/admin">Admin Dashboard</NavLink></li>
                        </>
                    }
                    <li id="nav-link"><NavLink to={'/profile'}>Profile</NavLink></li>
                    <li id="nav-link"><NavLink onClick={userLogout}>Logout</NavLink></li>
                </>
            }
            <li id="open">Open</li>
        </ul>

        <ul className="sidebar">
            <li id="close">X</li>
            {
                !user?.token && <>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/register">Register</NavLink></li>
                </>
            }
            {
                user?.token && <>
                    {
                        user.role === 'user' && <>
                            <li><NavLink to="/blog">News</NavLink></li>
                            <li><NavLink to="/portfolio">Portfolio</NavLink></li>
                            <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                        </>
                    }
                    {
                        user.role === 'admin' && <>
                            <li><input type="text" placeholder="Search..." /></li>
                            <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
                        </>
                    }
                    <li><NavLink to={'/profile'}>Profile</NavLink></li>
                    <li><NavLink onClick={userLogout}>Logout</NavLink></li>
                </>
            }
        </ul>
    </nav>
}