import { create } from 'zustand'
import api from '@/api'

interface DecoderStore {
    decoder: Decoder | null
    decoders: Decoder[],
    getDecoderById: (id: string) => Promise<Decoder | null>,
    getDecoders: () => Promise<Decoder[] | null>
}

export const useDecoderStore = create<DecoderStore>(set => ({
    decoder: null,
    decoders: [],
    getDecoderById: async (id: string) => {
        try {
            const response = await api.get(`/decoder/${id}`)
            set({ decoder: response.data })
            return response.data
        } catch (error) {
            set({ decoder: null })
            console.error('Failed to fetch decoder:', error)
            return null
        }
    },
    getDecoders: async () => {
        try {
            const response = await api.get('/decoder')
            set({ decoders: response.data })
            return response.data
        } catch (error) {
            set({ decoders: [] })
            console.error('Failed to fetch decoders:', error)
            return null
        }
    },
}))
