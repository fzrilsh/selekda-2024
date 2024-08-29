import { createContext, useContext, useState } from "react";

const authContext = createContext({
    user: {},
    login: (userData = {}) => {},
    logout: () => {}
})

export const UseAuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        if(localStorage.getItem('user')) return JSON.parse(localStorage.getItem('user'))
        else return false
    })

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(false)
        localStorage.clear()
    }

    return <authContext.Provider value={{
        user, login, logout
    }}>
        {children}
    </authContext.Provider>
}

export const useAuth = () => useContext(authContext)