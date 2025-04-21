import { create } from 'zustand'
import api from '@/api'

interface DecoderStore {
    decoder: Decoder | null
    getDecoderById: (id: string) => Promise<Decoder | null>
}

export const useDecoderStore = create<DecoderStore>(set => ({
    decoder: null,
    getDecoderById: async (id: string) => {
        try {
            const response = await api.get(`/decoder/${id}`)
            console.log('decoder: ', response.data)
            set({ decoder: response.data })
            return response.data
        } catch (error) {
            set({ decoder: null })
            console.error('Failed to fetch decoder:', error)
            return null
        }
    },
}))
