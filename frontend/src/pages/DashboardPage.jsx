import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBase } from '../utils/fetchBase'

export const DashboardPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const hasToken = localStorage.getItem('token')
        if (!hasToken) {
            navigate('/login')
        }
    }, [])

    const fetchCustomers = async () => {
        const json = await fetchBase({
            endpoint: 'customers',
            controller: 'auth',
        })
    }
    return (
        <>
            <p>Dashboard</p>
            <button onClick={() => fetchCustomers()}>fetch customers</button>
        </>

    )
}
