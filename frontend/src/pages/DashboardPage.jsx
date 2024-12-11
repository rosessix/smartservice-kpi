import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const hasToken = localStorage.getItem('token')
        if (!hasToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>DashboardPage</div>
    )
}
