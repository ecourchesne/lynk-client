import { create } from 'zustand';
import api from '@/api';

type Client = {
  id: string;
  user: User;
  personal?: {
    decoderId: string;
  };
  commercial?: {
    decoders: Decoder[];
  };
  type: 'personnal' | 'commercial';
};

type PersonalClient = {
  id: string;
  user: User;
  decoderId: string;
};

type CommercialClient = {
  id: string;
  user: User;
  decoders: Decoder[];
};

interface ClientStore {
  clients: Client[];
  personalClients: PersonalClient[];
  commercialClients: CommercialClient[];
  fetchClients: () => Promise<void>;
  addClient: (client: { email: string; type: 'personnal' | 'commercial'; decoderId?: number; companyId?: number }) => Promise<void>;
  clearClients: () => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  personalClients: [],
  commercialClients: [],
  fetchClients: async () => {
    try {
      const response = await api.get('/client');
      const clients = response.data;

      const personalClients: PersonalClient[] = clients
        .filter((client: Client) => client.type == 'personnal')
        .map((client: Client) => ({
          id: client.id,
          user: client.user,
          decoderId: client.personal?.decoderId || '',
        }));


      const commercialClients: CommercialClient[] = clients
        .filter((client: Client) => client.type === 'commercial')
        .map((client: Client) => ({
          id: client.id,
          user: client.user,
          decoders: client.commercial?.decoders || [],
        }));

      set({ clients, personalClients, commercialClients });
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  },
    addClient: async (client: { email: string, type: 'personnal' | 'commercial', decoderId?: number, companyId?: number }) =>
      {
        try {
          let route = "";
          if (client.type === 'personnal')
            route = '/client/personal';
          else if (client.type === 'commercial')
            route = '/client/commercial';
  
          const response = await api.post(route, client) ;
  
          set((state) => ({ clients: [...state.clients, response.data] }));
        } catch (error) {
          console.error('Failed to add client:', error);
        }
      },
  clearClients: () => set({ clients: [], personalClients: [], commercialClients: [] }),
}));