import { useAuthStore } from '@/store/authStore'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const { user } = useAuthStore()

    if (!user) {
        return <div>not logged in</div>
    }

    if (user.role === 'admin') {
        return <Dashboard />
    }
}

export default Home
