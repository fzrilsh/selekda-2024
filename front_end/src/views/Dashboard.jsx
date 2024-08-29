import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import { useCallback, useEffect, useMemo, useState } from "react"

export default function Dashbaord() {
    const {user} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const [leaderboard, setLeaderboard] = useState([])
    const getLeaderboard = async() => {
        let resp = await fetch({ method: 'get', path: '/score' })
        if(resp.sattus) setLeaderboard(resp.data)
    }

    const myLeaderboard = useMemo(() => {
        return leaderboard.filter(lead => lead.author.username === user?.username)
    }, [leaderboard.length])

    const Leaderboard = useCallback(() => {
        if(!myLeaderboard.length) return;

        return <table>
            <tr>
                <td>Email</td>
                <td>Username</td>
                <td>Country</td>
                <td>Score</td>
                <td>Timestamp</td>
            </tr>
            {
                myLeaderboard.map(lead => {
                    return <tr>
                        <td>{lead.author.email}</td>
                        <td>{lead.username}</td>
                        <td>{lead.country}</td>
                        <td>{lead.score}</td>
                        <td>{(new Date(lead.created_at)).toLocaleString('id-ID')}</td>
                    </tr>
                })
            }
        </table>
    }, [myLeaderboard])

    useEffect(() => {
        if(!leaderboard.length) getLeaderboard()
    })

    return <main className="dashboard">
        <section>
            <h1>Our Games</h1>
        </section>
    </main>
}