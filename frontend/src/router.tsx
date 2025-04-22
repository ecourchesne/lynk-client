import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Auth from './pages/auth/Auth'
import NotFound from './pages/FourOFour'
import Company from './pages/Company'
import Decoder from './pages/Decoder'
import NewClient from './pages/new-client/NewClient'
import Home from './pages/Home'
import NewCompany from './pages/NewCompany'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/auth', element: <Auth /> },
            { path: '/auth/sign-up', element: <Auth /> },
            { path: '/new-client', element: <NewClient /> },
            { path: '/new-company', element: <NewCompany /> },
            { path: 'company/:id', element: <Company /> }, // company details
            { path: 'decoder/:id', element: <Decoder /> }, // decoder details
            { path: '*', element: <NotFound /> }, // 404 page
        ],
    },
])
