import { create } from 'zustand'
import api from '@/api'

interface CompanyStore {
    company: Company | null
    companies: Company[],
    getCompanyId: (id: string) => Promise<Company | null>,
    getCompanies: () => Promise<Company[] | null>
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
    }	
}))
