import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export default function Login(){
    const {user, login} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()

        let resp = await fetch({ method: 'post', path: '/login', value: Object.fromEntries(new FormData(e.target)) })
        if(!resp.status) return alert(resp.message)

        login(resp.data)
        navigate('/')
    }

    useEffect(() => {
        if(user?.token) return navigate('/')
    })

    return <main id="login">
        <div className="card">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <input type="password" name="password" id="password" placeholder="******" />
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                    <p>Don't have an account yet? <NavLink to={'/register'}>Register</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}