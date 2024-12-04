import mainIcon from '../assets/main.svg';
import tariffsIcon from '../assets/tariffs.png';
import installationIcon from '../assets/installation.svg';
import InstallationPage from '../pages/installation-page/InstallationPage';
import MainPage from '../pages/main-page/MainPage';
import TariffsPage from '../pages/tariffs-page/TariffsPage';

export interface IMenuItem {
  label: string;
  component: React.ReactNode;
  icon: string;
}

export const menuItems: IMenuItem[] = [
  { label: 'Главная', component: <MainPage />, icon: mainIcon },
  { label: 'Тарифы', component: <TariffsPage />, icon: tariffsIcon },
  {
    label: 'Установка',
    component: <InstallationPage />,
    icon: installationIcon,
  },
];
