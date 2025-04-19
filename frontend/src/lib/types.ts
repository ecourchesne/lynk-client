declare global {
    type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

    type User = {
        id: string
        firstname: string
        lastname: string
        email: string
        password: string
        role: 'admin' | 'personal' | 'commercial'
    }

    type Client = {
        id: string
        userId: string
    }

    interface CommercialClient extends Client {
        id: string
        userId: string
        companyId: string
    }

    interface PersonalClient extends Client {
        id: string
        userId: string
        decoderId: string
    }

    type Company = {
        id: string
        accountActivationKey: string
        name: string
        address: string
        decoders: Decoder[]
    }

    type Decoder = {
        id: string
        name: string
        model: string
        state: 'active' | 'inactive' | null
        subscriptions: SubscriptionItem[]
    }

    type SubscriptionItem = {
        id: string
        type: 'channel' | 'app' | 'feature'
        name: string
    }
}
