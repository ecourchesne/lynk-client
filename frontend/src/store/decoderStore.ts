import { create } from 'zustand'
import api from '@/api'

interface DecoderStore {
    decoder: Decoder | null
    decoders: Decoder[]
    subscriptions: SubscriptionItem[]
    getDecoderById: (id: string) => Promise<Decoder | null>
    getDecoders: () => Promise<Decoder[] | null>
    getSubscriptions: () => Promise<void>
    addSubscription: (decoderId: string, subscriptionItemIds: number[]) => Promise<void>
    deleteSubscription: (decoderId: string, subscriptionItemIds: number[]) => Promise<void>
    reboot: (decoderId: string) => Promise<void>
    reset: (decoderId: string) => Promise<void>
    kill: (decoderId: string) => Promise<void>
}

export const useDecoderStore = create<DecoderStore>(set => ({
    decoder: null,
    decoders: [],
    subscriptions: [],
    getDecoderById: async (id: string) => {
        try {
            const response = await api.get(`/decoder/${id}`)
            console.log('Fetched decoder:', response.data)
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
    getSubscriptions: async () => {
        try {
            const response = await api.get('/subscription-item')
            set({ subscriptions: response.data })
        } catch (error) {
            console.error('Failed to fetch subscriptions:', error)
        }
    },
    addSubscription: async (decoderId: string, subscriptionItemIds: number[]) => {
        try {
            const response = await api.post(`/decoder/${decoderId}/subscriptions`, {
                subscriptionItemIds,
            })
            set({ decoder: response.data })
        } catch (error) {
            console.error('Failed to add subscriptions:', error)
        }
    },
    deleteSubscription: async (decoderId: string, subscriptionItemIds: number[]) => {
        try {
            const response = await api.delete(`/decoder/${decoderId}/subscriptions`, {
                data: { subscriptionItemIds },
            })
            set({ decoder: response.data })
        } catch (error) {
            console.error('Failed to delete subscriptions:', error)
        }
    },
    reset: async (decoderId: string) => {
        try {
            const response = await api.post(`/decoder/${decoderId}/reinit`)
            set({ decoder: response.data })
        } catch (error) {
            console.error('Failed to reset decoder:', error)
        }
    },
    reboot: async (decoderId: string) => {
        try {
            const response = await api.post(`/decoder/${decoderId}/reset`)
            set({ decoder: response.data })
        } catch (error) {
            console.error('Failed to reset decoder:', error)
        }
    },
    kill: async (decoderId: string) => {
        try {
            const response = await api.post(`/decoder/${decoderId}/shutdown`)
            set({ decoder: response.data })
        } catch (error) {
            console.error('Failed to kill decoder:', error)
        }
    },
}))
