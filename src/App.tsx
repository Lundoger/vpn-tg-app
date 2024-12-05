import { useState, useCallback, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { menuItems } from './constants/menuData';
import Navigation from './shared/navigation/Navigation';
import styles from './App.module.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 минут в милисекудах
    },
  },
});

const App = () => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [activeComponent, setActiveComponent] = useState<string>(
    menuItems[0].label,
  );

  const handleItemSelect = useCallback((label: string) => {
    setActiveComponent(label);
  }, []);

  const activePage = menuItems.find(
    (item) => item.label === activeComponent,
  )?.component;

  return (
    <QueryClientProvider client={queryClient}>
      <main className={styles.app}>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={activeComponent}
            nodeRef={nodeRef}
            timeout={100}
            classNames={{
              enterDone: styles.done,
            }}
            unmountOnExit
          >
            <div ref={nodeRef} className={styles.viewContainer}>
              {activePage}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <Navigation
          items={menuItems}
          activeItem={activeComponent}
          onItemSelect={handleItemSelect}
        />
      </main>
    </QueryClientProvider>
  );
};

export default App;
