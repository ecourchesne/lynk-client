import { useAuthStore } from '@/store/authStore'
import Dashboard from './Dashboard'

const Home = () => {
    const { user } = useAuthStore()

    if (!user) {
        return <div>not logged in</div>
    }

    if (user.role === 'admin') {
        return <Dashboard />
    }

    return <div>this is gonna the home</div>
}

export default Home
