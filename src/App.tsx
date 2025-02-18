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

  const handleItemSelect = useCallback((label: string) => {
    setActiveItem(label);
  }, [setActiveItem]);

  const activePage = menuItems.find(
    (item) => item.label === activeItem,
  )?.component;

  function parseTelegramInitData(initData: string) {
    // Создаём объект для работы с query-параметрами
    const params = new URLSearchParams(initData);
  
    // Например, вытаскиваем поле "user", в котором Telegram хранит данные пользователя
    const userParam = params.get('user');
    
    let user = null;
    if (userParam) {
      // userParam - это закодированная строка JSON, поэтому сначала декодируем
      const decodedUser = decodeURIComponent(userParam); 
      // Теперь decodedUser должен выглядеть как {"id":538326553,"first_name":"..."}
      user = JSON.parse(decodedUser);
    }
  
    // Аналогично можно извлечь другие параметры:
    const chatInstance = params.get('chat_instance');
    const chatType = params.get('chat_type');
    const authDate = params.get('auth_date');
    const signature = params.get('signature');
    const hashValue = params.get('hash');
  
    // Собираем в объект для удобства
    return {
      user,
      chatInstance,
      chatType,
      authDate,
      signature,
      hash: hashValue
    };
  }
  
  // Пример использования в вашем коде
  const initDataStr = window.Telegram?.WebApp?.initDataUnsafe || '';
  console.log('initDataStr', initDataStr);
  // const authHeader = parseTelegramInitData(initDataStr);
  
  // console.log('authHeader:', authHeader);
  

  const startAuth = async () => {
    try {
      const parsedData = window.Telegram?.WebApp?.initDataUnsafe;
      
      // Преобразуем объект в строку запроса напрямую
      const dataCheckString = Object.entries(parsedData)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => `${key}=${typeof value === 'object' ? JSON.stringify(value) : value}`)
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
