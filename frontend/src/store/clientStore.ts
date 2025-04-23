import { create } from 'zustand'
import api from '@/api'
import { generateActivationKey } from '@/lib/utils'

type Client = {
    id: string
    user: User
    personal?: {
        decoderId: string
    }
    commercial?: {
        decoders: Decoder[]
    }
    type: 'personnal' | 'commercial'
}

type PersonalClient = {
    id: string
    user: User
    decoderId: string
}

type CommercialClient = {
    id: string
    user: User
    decoders: Decoder[]
}

interface ClientStore {
    clients: Client[]
    personalClients: PersonalClient[]
    commercialClients: CommercialClient[]
    fetchClients: () => Promise<void>
    // addClient: (client: { email: string; type: 'personnal' | 'commercial'; decoderId?: number; companyId?: number }) => Promise<void>;
    addPersonalClient: (client: {
        email: string
        decoderId?: number
    }) => Promise<{ success: boolean; error: string | null }>
    addCommercialClient: (client: {
        email: string
        companyId: number
    }) => Promise<{ success: boolean; error: string | null }>
    clearClients: () => void
}

export const useClientStore = create<ClientStore>(set => ({
    clients: [],
    personalClients: [],
    commercialClients: [],
    fetchClients: async () => {
        try {
            const response = await api.get('/client')
            const clients = response.data
            console.log('Fetched clients:', clients)

            const personalClients: PersonalClient[] = clients
                .filter((client: Client) => client.type == 'personnal')
                .map((client: Client) => ({
                    id: client.id,
                    user: client.user,
                    decoderId: client.personal?.decoderId || '',
                }))

            const commercialClients: CommercialClient[] = clients
                .filter((client: Client) => client.type === 'commercial')
                .map((client: Client) => ({
                    id: client.id,
                    user: client.user,
                    decoders: client.commercial?.decoders || [],
                }))

            set({ clients, personalClients, commercialClients })
        } catch (error) {
            console.error('Failed to fetch clients:', error)
        }
    },
    addPersonalClient: async (client: { email: string; decoderId?: number }) => {
        try {
            const response = await api.post('/client/personal', client)
            const newClient = response.data
            const activationKey = generateActivationKey('personal', client.decoderId!)
            console.log('New client added:', newClient, activationKey)
            set(state => ({
                clients: [...state.clients, newClient],
                personalClients: [...state.personalClients, newClient],
            }))

            return { success: true, error: null }
        } catch (error) {
            console.error('Failed to add personal client:', error)

            return { success: false, error: 'Failed to add personal client' }
        }
    },
    addCommercialClient: async (client: { email: string; companyId: number }) => {
        try {
            const response = await api.post('/client/commercial', client)
            const newClient = response.data
            const activationKey = generateActivationKey('commercial', client.companyId)
            console.log('New client added:', newClient, activationKey)
            set(state => ({
                clients: [...state.clients, newClient],
                commercialClients: [...state.commercialClients, newClient],
            }))

            return { success: true, error: null }
        } catch (error) {
            console.error('Failed to add commercial client:', error)

            return { success: false, error: 'Failed to add commercial client' }
        }
    },
    clearClients: () => set({ clients: [], personalClients: [], commercialClients: [] }),
}))
