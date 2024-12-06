import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import Navigation from './shared/navigation/Navigation';
import { menuItems } from './constants/menuData';
import { useNavigationStore } from './store/store';
import styles from './App.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
});

const App = () => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const activeItem = useNavigationStore((state) => state.activeItem);
  const setActiveItem = useNavigationStore((state) => state.setActiveItem);

  const handleItemSelect = useCallback((label: string) => {
    setActiveItem(label);
  }, []);

  const activePage = menuItems.find(
    (item) => item.label === activeItem,
  )?.component;

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
