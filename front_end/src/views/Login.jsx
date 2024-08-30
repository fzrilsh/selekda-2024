import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Login(){
    const {user, login} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const [captchaContent, setCaptchaContent] = useState({})
    const getCaptcha = async() => {
        let resp = await fetch({ method: 'get', path: '/captcha' })
        if(resp.status) setCaptchaContent(resp.data)
    }

    const submitHandler = async(e) => {
        e.preventDefault()

        let value = Object.fromEntries(new FormData(e.target))
        let captchaValidator = await fetch({ method: 'put', path: '/captcha/'+captchaContent.id, value: {answer: value.captcha} })
        if(!captchaValidator.status){
            alert('Captcha is invalid.')
            getCaptcha()
            return;
        }

        let resp = await fetch({ method: 'post', path: '/login', value })
        if(!resp.status){
            getCaptcha()
            return alert(resp.message)
        }

        login(resp.data)
        navigate('/')
    }

    useEffect(() => {
        if(user?.token) return navigate('/')
        if(!captchaContent?.id) getCaptcha()
    })

    return <main id="login">
        <div className="card">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <div className="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <input type="password" name="password" id="password" placeholder="******" />
                    <div className="captcha">
                        <span>{captchaContent?.question} =</span>
                        <input type="text" name="captcha" id="captcha" required />
                    </div>
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                    <p>Don't have an account yet? <NavLink to={'/register'}>Register</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}