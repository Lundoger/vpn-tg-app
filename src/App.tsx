import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import MainPage from './pages/main-page/MainPage';
import TariffsPage from './pages/tariffs-page/TariffsPage';
import InstallationPage from './pages/installation-page/InstallationPage';
import clsx from 'clsx';
import mainIcon from './assets/main.svg';
import tariffsIcon from './assets/tariffs.png';
import installationIcon from './assets/installation.svg';
import styles from './App.module.scss';

interface IMenuComponents {
  [key: string]: React.ReactNode;
}

interface IMenuIcons {
  [key: string]: string;
}

const menuComponents: IMenuComponents = {
  Главная: <MainPage />,
  Тарифы: <TariffsPage />,
  Установка: <InstallationPage />,
};

const menuIcons: IMenuIcons = {
  Главная: mainIcon,
  Тарифы: tariffsIcon,
  Установка: installationIcon,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // Время в миллисекундах
    },
  },
});

const App = () => {
  const [activeComponent, setActiveComponent] = useState('Главная');

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.app}>
        <div className={styles.viewContainer}>
          {menuComponents[activeComponent]}
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            {Object.keys(menuComponents).map((menuItem) => (
              <li
                key={menuItem}
                className={clsx(
                  styles.listItem,
                  menuItem === activeComponent && styles.active,
                )}
                onClick={() => setActiveComponent(menuItem)}
              >
                <div className={styles.imageContainer}>
                  <img src={menuIcons[menuItem]} alt={`${menuItem} icon`} />
                </div>
                <span className="istok-web">{menuItem}</span>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </QueryClientProvider>
  );
};

export default App;
