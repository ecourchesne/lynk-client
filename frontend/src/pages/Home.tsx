import { useAuthStore } from '@/store/authStore'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    const navigate = useNavigate()

    const { user } = useAuthStore()

    if (!user) {
        return navigate('/auth')
    }

    useEffect(() => {
        if (user.role === 'individual') navigate(`/decoder/${user.decoderId}`)
        else if (user.role === 'employee') navigate(`/company/${user.companyId}`)
    }, [navigate, user])

    return (
        <>
            <Dashboard />
        </>
    )
}

export default Home
