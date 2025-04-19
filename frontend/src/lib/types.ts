declare global {
    type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

    type User = {
        id: string
        firstName: string
        lastName: string
        email: string
        password: string
        role: 'admin' | 'personal' | 'commercial'
    }

    type Client = {
        id: string
        userId: string
    }

    interface CommercialClient extends Client {
        userId: string
        companyId: string
    }

    interface PersonalClient extends Client {
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
