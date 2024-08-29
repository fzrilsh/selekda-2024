import { NavLink } from "react-router-dom";

export default function Register(){
return <main id="register">
        <div className="card">
            <h1>Register</h1>
            <form>
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
                    <button>Register</button>
                    <p>Already have an account yet? <NavLink to={'/login'}>Login</NavLink></p>
                </div>
            </form>
        </div>
    </main>
}