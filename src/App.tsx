import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCallback, useRef, useEffect } from 'react';
import Navigation from './shared/navigation/Navigation';
import { menuItems } from './constants/menuData';
import { useNavigationStore } from './store/store';
import styles from './App.module.scss';
import Cookies from 'js-cookie';
import { postAuth } from './api/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: any;
  Utils: {
    urlParseQueryString: (data: string) => Record<string, string>;
  };
}

interface Telegram {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const App = () => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const activeItem = useNavigationStore((state) => state.activeItem);
  const setActiveItem = useNavigationStore((state) => state.setActiveItem);

  const handleItemSelect = useCallback(
    (label: string) => {
      setActiveItem(label);
    },
    [setActiveItem],
  );

  const activePage = menuItems.find(
    (item) => item.label === activeItem,
  )?.component;

  const startAuth = async () => {
    try {
      console.log('startAuth', window.Telegram?.WebApp?.initDataUnsafe);
      const parsedData = window.Telegram?.WebApp?.initDataUnsafe;

      const safeJSONStringify = (obj: any) =>
        JSON.stringify(obj).replace(/\//g, '\\/');

      // Получаем ключи, отфильтровываем null-значения, сортируем их и формируем строку запроса
      const dataCheckString = Object.keys(parsedData)
        .sort()
        .map((key) => {
          const value = parsedData[key];
          // Если значение — объект, сериализуем с заменой символов "/"
          return `${key}=${typeof value === 'object' ? safeJSONStringify(value) : value}`;
        })
        .join('&');

      console.log('dataCheckString', dataCheckString);

      const token = await postAuth(dataCheckString);
      console.log('token', token);

      // Сохраняем полученный токен в cookies на 1 день
      document.cookie = `auth_token=${token.token}; max-age=86400; path=/`;
    } catch (error) {
      console.error('Telegram authentication failed:', error);
    }
  };

  useEffect(() => {
    // Проверяем наличие токена авторизации
    const authToken = Cookies.get('auth_token');
    console.log('authToken', authToken);
    if (!authToken) {
      startAuth();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.app}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={activeItem}
            nodeRef={nodeRef}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            appear
          >
            <div ref={nodeRef} className={styles.viewContainer}>
              {activePage}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <Navigation
          items={menuItems}
          activeItem={activeItem}
          onItemSelect={handleItemSelect}
        />
      </main>
    </QueryClientProvider>
  );
};

export default App;
