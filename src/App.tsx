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
      const dataCheckString = Object.keys(parsedData)
        .sort()
        .map((key) => {
          const value = parsedData[key];
          return `${key}=${typeof value === 'object' ? safeJSONStringify(value) : value}`;
        })
        .join('&');

      console.log('dataCheckString', dataCheckString);
      const token = await postAuth(dataCheckString);
      document.cookie = `auth_token=${token.token}; max-age=86400; path=/`;
    } catch (error) {
      console.error('Telegram authentication failed:', error);
    }
  };

  const devAuth = async () => {
    const testDataCheckString =
      'auth_date=1736960774&chat_instance=8610356838351439092&chat_type=private&hash=f11aaab0a3b3deb9f3140fdd216c46086947d4426081f27da0c85f5dbc142e51&signature=9cgzhZs_ncdtZTBRXylP7OXnNl5PveVFlAdYzExgMWYil9Vh38gZeekt5Khcvcjwtzvd1hH--WTF--7unJrtDg&user={"id":1,"first_name":"eralinkd","last_name":"","username":"sb_newest","language_code":"ru","allows_write_to_pm":true,"photo_url":"https:\/\/t.me\/i\/userpic\/320\/t8iGW7XVQ3k-EvpOOkPQ0IawHU5MwdAHEG5QJrYx3Gs.svg"}'
    const token = await postAuth(testDataCheckString);
    document.cookie = `auth_token=${token.token}; max-age=86400; path=/`;
  };

  useEffect(() => {
    const authToken = Cookies.get('auth_token');
    console.log('authToken', authToken);
    if (!authToken) {
      const env = import.meta.env.VITE_ENV;
      if (env === 'dev') {
        console.log('dev mode');
        devAuth();
      } else if (env === 'stage') {
        startAuth();
      } else {
        console.log('undefined env');
      }
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
