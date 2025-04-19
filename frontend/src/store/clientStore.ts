import { create } from 'zustand';
import api from '@/api';

type Client = {
  id: string;
  name: string;
  type: 'personal' | 'commercial';
  decoders?: { id: string; name: string }[]; // Optionnel pour les décodeurs
};

interface ClientStore {
  clients: Client[];
  fetchClients: () => Promise<void>;
  addClient: (client: Client) => void;
  clearClients: () => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  fetchClients: async () => {
    try {
      const response = await api.get('/client'); // Remplacez par votre endpoint backend
      set({ clients: response.data });
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  },
  addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
  clearClients: () => set({ clients: [] }),
}));