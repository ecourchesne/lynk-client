import { create } from 'zustand'
import api from '@/api'

interface CompanyStore {
    company: Company | null
    companies: Company[]
    getCompanyId: (id: string) => Promise<Company | null>
    getCompanies: () => Promise<Company[] | null>
    createCompany: (data: { name: string; address: string }) => Promise<{ success: boolean; error: string | null }>
}

export const useCompanyStore = create<CompanyStore>(set => ({
    company: null,
    companies: [],
    getCompanyId: async (id: string) => {
        try {
            const response = await api.get(`/company/${id}`)
            set({ company: response.data })
            console.log('Fetched company:', response.data)
            return response.data
        } catch (error) {
            set({ company: null })
            console.error('Failed to fetch company:', error)
            return null
        }
    },
    getCompanies: async () => {
        try {
            const response = await api.get('/company')
            set({ companies: response.data })
            return response.data
        } catch (error) {
            set({ companies: [] })
            console.error('Failed to fetch companies:', error)
            return null
        }
    },
    createCompany: async (data: { name: string; address: string }) => {
        try {
            const response = await api.post('/company', data)
            set(state => ({ companies: [...state.companies, response.data] }))
            return { success: true, error: null }
        } catch (error) {
            console.error('Failed to create company:', error)
            return { success: false, error: 'Failed to create company' }
        }
    },
}))
