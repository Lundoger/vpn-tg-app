import { create } from 'zustand';
import { UserResponse, Tariff } from '../types/types';

interface NavigationStore {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
}

interface TariffsStore {
  tariffs: Tariff[];
  setTariffs: (tariffs: Tariff[]) => void;
}

interface Store extends NavigationStore, UserStore, TariffsStore {}

export const useStore = create<Store>((set) => ({
  activeItem: 'Главная',
  setActiveItem: (item) => set({ activeItem: item }),
  user: null,
  setUser: (user) => set({ user }),
  tariffs: [],
  setTariffs: (tariffs) => set({ tariffs }),
}));

// Для обратной совместимости
export const useNavigationStore = useStore;
