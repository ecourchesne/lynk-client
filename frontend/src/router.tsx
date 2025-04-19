import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Auth from './pages/auth/Auth'
import NotFound from './pages/FourOFour'
import Dashboard from './pages/dashboard/Dashboard'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Auth /> },
            { path: '/sign-up', element: <Auth /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: '*', element: <NotFound /> }, // 404 page
        ],
    },
])
