import api from '@/api'
import { create } from 'zustand'

type UserAttributes = {
    firstname: string
    lastname: string
    email: string
}

interface AuthStore {
    logged: boolean
    user: UserAttributes | null
    login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>
    register: (
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        activationKey: string
    ) => Promise<{ success: boolean; error: string | null }>
    logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
    logged: localStorage.getItem('logged') === 'yeah buddy',
    user: {
        firstname: 'Étienne',
        lastname: 'Courchesne',
        email: 'et.courchesne@gmail.com',
    },
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const { user } = response.data

            set({ logged: true, user })
            localStorage.setItem('logged', 'yeah buddy')

            return { success: true, error: null }
        } catch (error) {
            set({ logged: false, user: null })
            localStorage.removeItem('logged')
            console.error('Login failed:', error)
            return { success: false, error: (error as any)?.message || 'Something went wrong. Please try again.' }
        }
    },
    register: async (firstname: string, lastname: string, email: string, password: string, activationKey: string) => {
        try {
            const response = await api.post('/auth/register', { firstname, lastname, email, password, activationKey })
            const { user } = response.data
            set({ logged: true, user })
            localStorage.setItem('logged', 'yeah buddy')
            return { success: true, error: null }
        } catch (error) {
            set({ logged: false, user: null })
            localStorage.removeItem('logged')
            console.error('Registration failed:', error)
            return { success: false, error: (error as any)?.message || 'Something went wrong. Please try again.' }
        }
    },
    logout: () => {
        set({ logged: false, user: null })
        localStorage.removeItem('logged')
        delete api.defaults.headers.Authorization
    },
}))
