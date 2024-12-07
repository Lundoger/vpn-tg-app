import { IMenuItem } from '../types/types';
import InstallationPage from '../pages/installation-page/InstallationPage';
import MainPage from '../pages/main-page/MainPage';
import TariffsPage from '../pages/tariffs-page/TariffsPage';
import installationIcon from '../assets/installation.svg';
import mainIcon from '../assets/main.svg';
import tariffsIcon from '../assets/tariffs.svg';

export const menuItems: IMenuItem[] = [
  { label: 'Профиль', component: <MainPage />, icon: mainIcon },
  { label: 'Тарифы', component: <TariffsPage />, icon: tariffsIcon },
  {
    label: 'Установка',
    component: <InstallationPage />,
    icon: installationIcon,
  },
];
