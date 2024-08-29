import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function Dashbaord() {
    const {user} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const [leaderboard, setLeaderboard] = useState(false)
    const getLeaderboard = async() => {
        let resp = await fetch({ method: 'get', path: '/scores' })
        if(resp.status) setLeaderboard(resp.data)
    }

    const myLeaderboard = useMemo(() => {
        if(!leaderboard) return []
        return leaderboard.filter(lead => lead.author.username === user?.username)
    }, [leaderboard.length])

    const Leaderboard = useCallback(() => {
        if(!leaderboard) return <p>Loading ...</p>

        return <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Country</th>
                    <th>Score</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {
                    myLeaderboard.map(lead => {
                        return <tr key={lead.id}>
                            <td>{lead.author.email}</td>
                            <td>{lead.username}</td>
                            <td>{lead.country}</td>
                            <td>{lead.score}</td>
                            <td>{(new Date(lead.created_at)).toLocaleString('id-ID')}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    }, [myLeaderboard, leaderboard])

    useEffect(() => {
        if(!user?.token) return navigate('/login')
        if(!leaderboard.length) getLeaderboard()
    })

    return <main className="dashboard">
        <section id="games">
            <h1>Our Apps</h1>
            <ul>
                <li><NavLink to={'/game'}>World Head Football</NavLink></li>
                <li><NavLink to={'/apps'}>DSGN Illustrator</NavLink></li>
            </ul>
        </section>
        <section>
            <h1>My Leaderboard</h1>
            <Leaderboard />
        </section>
    </main>
}