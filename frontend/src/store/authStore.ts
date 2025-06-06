import api from '@/api'
import { create } from 'zustand'

type UserAttributes = {
    firstName: string
    lastName: string
    email: string
    role: 'admin' | 'employee' | 'individual'
    companyId?: string
    decoderId?: string
}

interface AuthStore {
    logged: boolean
    user: UserAttributes | null
    login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>
    register: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        activationKey: string
    ) => Promise<{ success: boolean; error: string | null }>
    logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
    logged: localStorage.getItem('logged') === 'yeah buddy',
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '')
        : {
              firstName: '',
              lastName: '',
              email: '',
              role: '',
          },
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const { firstName, lastName, email: _email, role, companyId, decoderId } = response.data
            console.log(response.data)

            set({
                logged: true,
                user: {
                    firstName,
                    lastName,
                    email: _email,
                    role: role === 'admin' ? 'admin' : decoderId ? 'individual' : 'employee',
                    companyId: companyId || undefined,
                    decoderId: decoderId || undefined,
                },
            })
            localStorage.setItem('logged', 'yeah buddy')
            localStorage.setItem(
                'user',
                JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: _email,
                    role: role === 'admin' ? 'admin' : decoderId ? 'individual' : 'employee',
                    companyId: companyId || undefined,
                    decoderId: decoderId || undefined,
                })
            )

            return { success: true, error: null }
        } catch (error) {
            set({ logged: false, user: null })
            localStorage.removeItem('logged')
            console.error('Login failed:', error)
            return { success: false, error: (error as any)?.message || 'Something went wrong. Please try again.' }
        }
    },
    register: async (firstName: string, lastName: string, email: string, password: string, activationKey: string) => {
        try {
            const response = await api.post('/auth/register', { firstName, lastName, email, password, activationKey })
            console.log(response.data)
            const { firstName: fn, lastName: ln, email: _email, role, companyId, decoderId } = response.data

            set({
                logged: true,
                user: {
                    firstName: fn,
                    lastName: ln,
                    email: _email,
                    role: role === 'admin' ? 'admin' : decoderId ? 'individual' : 'employee',
                    companyId: companyId || undefined,
                    decoderId: decoderId || undefined,
                },
            })
            localStorage.setItem('logged', 'yeah buddy')
            localStorage.setItem(
                'user',
                JSON.stringify({
                    firstName: fn,
                    lastName: ln,
                    email: _email,
                    role: role === 'admin' ? 'admin' : decoderId ? 'individual' : 'employee',
                    companyId: companyId || undefined,
                    decoderId: decoderId || undefined,
                })
            )
            return { success: true, error: null }
        } catch (error) {
            set({ logged: false, user: null })
            localStorage.removeItem('logged')
            localStorage.removeItem('user')
            console.error('Registration failed:', error)
            return { success: false, error: (error as any)?.message || 'Something went wrong. Please try again.' }
        }
    },
    logout: () => {
        set({ logged: false, user: null })
        localStorage.removeItem('logged')
        localStorage.removeItem('user')
    },
}))
