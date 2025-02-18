import { useEffect, useState } from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 3 секунды
    const interval = 50; // интервал обновления
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.loader}>
      <div className={styles.content}>
        <div className={styles.switch}>
          <div 
            className={styles.toggle} 
            style={{ 
              transform: `translateX(${progress * 2}%)`,
              backgroundColor: `hsl(${progress * 1.2}, 70%, 50%)`
            }}
          />
        </div>
        <p className={styles.text}>Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader; 