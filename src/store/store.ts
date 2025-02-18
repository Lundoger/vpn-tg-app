import { create } from 'zustand';
import { UserResponse } from '../types/types';

interface NavigationStore {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

interface UserStore {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
}

interface Store extends NavigationStore, UserStore {}

export const useStore = create<Store>((set) => ({
  activeItem: 'Главная',
  setActiveItem: (item) => set({ activeItem: item }),
  user: null,
  setUser: (user) => set({ user }),
}));

// Для обратной совместимости
export const useNavigationStore = useStore;
