import { NavLink } from "react-router-dom";

export default function Register(){
    return <main id="login">
        <div className="card">
            <h1>Register</h1>
            <form>
                <div className="input">
                    <input type="text" name="username" id="username" placeholder="Username" />
                    <input type="password" name="password" id="password" placeholder="*****" />
                </div>
                <div className="button">
                    <button>Login</button>
                    <p>Already have an account yet? <NavLink to={'/login'}>Login</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}