import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

export default function Register(){
    const {user, login} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()

        let resp = await fetch({ method: 'post', path: '/register', value: new FormData(e.target) })
        if(!resp.status) return alert(resp.message)

        login(resp.data)
        navigate('/')
    }

    useEffect(() => {
        if(user?.token) return navigate('/')
    })

    return <main id="register">
        <div className="card">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className="input">
                    <input type="text" name="name" id="name" placeholder="John Doe" required/>
                    <input type="text" name="username" id="username" placeholder="john.doe" required/>
                    <input type="email" name="email" id="email" placeholder="webtech@example.com" required/>
                    <input type="password" name="password" id="password" placeholder="******" required/>
                    <input type="date" name="date_of_birth" id="date_of_birth" placeholder="" required/>
                    <input type="tel" name="phone_number" id="phone_number" placeholder="0812345678" required/>
                </div>
                <input type="file" name="profile_picture" id="profile_picture" required/>
                <div className="button">
                    <button type="submit">Register</button>
                    <p>Already have an account yet? <NavLink to={'/login'}>Login</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}