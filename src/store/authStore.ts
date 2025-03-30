import api from '@/api'
import { create } from 'zustand'

type UserAttributes = {
    firstname: string
    lastname: string
    email: string
}

interface AuthStore {
    token: string | null
    user: UserAttributes | null
    login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>
    logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
    token: null,
    user: null,
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const { token, user } = response.data

            set({ user, token })
            localStorage.setItem('token', token) // Persist token
            api.defaults.headers.Authorization = `Bearer ${token}`

            return { success: true, error: null }
        } catch (error) {
            console.error('Login failed:', error)
            return { success: false, error: (error as any)?.message || 'Something went wrong. Please try again.' }
        }
    },
    logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
        delete api.defaults.headers.Authorization
    },
}))
