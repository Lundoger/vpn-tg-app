import { create } from 'zustand';
import { menuItems } from '../constants/menuData';

interface NavigationState {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeItem: menuItems[0].label,
  setActiveItem: (item) => set({ activeItem: item }),
}));
