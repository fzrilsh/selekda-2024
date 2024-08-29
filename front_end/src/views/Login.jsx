import { NavLink } from "react-router-dom";

export default function Login(){
    return <main id="login">
        <div className="card">
            <h1>Login</h1>
            <form>
                <div className="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <input type="password" name="password" id="password" placeholder="*****" />
                </div>
                <div className="button">
                    <button>Login</button>
                    <p>Don't have an account yet? <NavLink to={'/register'}>Register</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}