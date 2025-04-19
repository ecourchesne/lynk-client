import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Auth from './pages/auth/Auth'
import NotFound from './pages/FourOFour'
import Dashboard from './pages/Dashboard'
import Company from './pages/Company'
import Decoder from './pages/Decoder'
import NewClient from './pages/NewClient'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Auth /> },
            { path: '/sign-up', element: <Auth /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'dashboard/new-client', element: <NewClient /> },
            { path: 'company/:id', element: <Company /> }, // company details
            { path: 'decoder/:id', element: <Decoder /> }, // decoder details
            { path: '*', element: <NotFound /> }, // 404 page
        ],
    },
])
