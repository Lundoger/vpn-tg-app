import { useEffect, useRef, useState } from 'react';

import Button from '../../shared/button/Button';
import clsx from 'clsx';
import styles from './MainPage.module.scss';
import { useNavigationStore } from '../../store/store';

interface CircleInfo {
  total: number;
  left: number;
}

const MainPage = () => {
  const setActiveItem = useNavigationStore((state) => state.setActiveItem);
  const [keyV, setKeyV] = useState<string>(
    'ss://hD12SN123JNSHBjDHb2V2gn12n323as',
  );
  const [circleInfo, setCircleInfo] = useState<CircleInfo>({
    total: 500,
    left: 377,
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setKeyV('ss://hD12SN123JNSHBjDHb2V2gn12n323as');
    setCircleInfo({
      total: 500,
      left: 200,
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(keyV);
    setIsCopied(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 700);
  };

  const handleClick = () => {
    setActiveItem('Тарифы');
  };

  const remainingPercentage = (circleInfo.left / circleInfo.total) * 100;
  const angle = 360 - (remainingPercentage / 100) * 360;

  return (
    <section className={styles.section}>
      <h2>Осталось</h2>
      <div
        className={clsx(styles.circle, {
          [styles.empty]: circleInfo.left === 0,
        })}
        style={{
          background: `conic-gradient(rgba(69, 69, 69, 0.32) 0deg ${angle}deg, #46cfa1 ${angle}deg)`,
        }}
      >
        <div>{circleInfo.left} GB</div>
        {circleInfo.left > 0 && (
          <div
            style={{ transform: `rotate(${angle - 90}deg) translateX(74px)` }}
            className={styles.marker}
          ></div>
        )}
      </div>
      <p className={styles.upd}>Обновляется ежемесячно</p>

      <div className={styles.keyContainer}>
        <label htmlFor="key">Ваш ключ для Outline</label>
        <div>
          <input
            onClick={handleCopy}
            name="key"
            readOnly
            type="text"
            value={keyV}
          ></input>
          <button onClick={handleCopy}></button>
        </div>
        <p onClick={handleCopy}>Нажмите, чтобы скопировать</p>
      </div>

      <div className={styles.info}>
        <p>
          Подписка:{' '}
          <span className={clsx(styles.subscription, styles.premium)}>
            <span>Премиум</span>
          </span>
        </p>
        <p>
          Действует до: <span className={styles.date}>27/12/2025</span>
        </p>
      </div>

      <Button onClick={handleClick} text="Продлить"></Button>

      <div className={clsx(styles.copied, isCopied && styles.active)}>
        Ключ скопирован!
      </div>
    </section>
  );
};

export default MainPage;
