import { useCallback, useEffect, useMemo, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import useFetch from "../hooks/useFetch"
import { NavLink, useNavigate } from "react-router-dom"

export default function AdminDashboard(){
    document.title = 'Admin Dashboard'

    const {user} = useAuth()
    const {fetch} = useFetch()
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const getUsers = async() => {
        let resp = await fetch({ method: 'get', path: '/users' })
        if(resp.status) setUsers(resp.data)
    }

    const getUserNotAdmin = useMemo(() => {
        if(!users.length) return false
        return users.filter(v => v.role === 'user')
    }, [users.length])

    const TableUsers = useCallback(() => {
        if(!getUserNotAdmin) return <h3>Loading...</h3>
        else return <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    getUserNotAdmin.map((v, i) => {
                        return <tr>
                            <td>{i+1}</td>
                            <td>{v.username}</td>
                            <td>{v.email}</td>
                            <td class="action"><NavLink onClick={async() => {
                                
                            }}>Delete</NavLink></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    }, [getUserNotAdmin])

    useEffect(() => {
        if(user?.role !== 'admin') return navigate('/dashboard')
        if(!users.length) getUsers()
    })

    return <main>

        <div class="sidebar">
            <h1>Sidebar</h1>
            <ul>
                <li>Blogs</li>
                <li>Portfolio</li>
                <li>Banner</li>
                <li>Users</li>
            </ul>
        </div>

        <section id="users">
            <h1>Users</h1>
            <TableUsers />
        </section>

        <section id="charts">
            <img src="/imgs/chart1.png" alt="chart1" />
            <img src="/imgs/chart2.png" alt="chart2" />
            <img src="/imgs/chart3.png" alt="chart3" />
        </section>

    </main>
}