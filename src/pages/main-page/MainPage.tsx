import { useEffect, useRef, useState } from 'react';

import Button from '../../shared/button/Button';
import clsx from 'clsx';
import copyIcon from '../../assets/copy-icon.svg';
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
    left: 0,
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [animatedAngle, setAnimatedAngle] = useState(0);

  const targetAngle = 360 - (circleInfo.left / circleInfo.total) * 360;

  useEffect(() => {
    setKeyV('ss://hD12SN123JNSHBjDHb2V2gn12n323as');
    setCircleInfo({
      total: 500,
      left: 200,
    });
  }, []);

  useEffect(() => {
    let startAngle = 0;
    let endAngle = targetAngle;
    let startTime: number | null = null;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentAngle = startAngle + (endAngle - startAngle) * progress;
      setAnimatedAngle(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => { };
  }, [targetAngle]);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(keyV);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 4000);
  };

  const handleClick = () => {
    setActiveItem('Тарифы');
  };

  return (
    <section className={styles.section}>
      <h2>Осталось</h2>
      <div
        className={clsx(styles.circle, {
          [styles.empty]: circleInfo.left === 0,
        })}
        style={{
          background: `conic-gradient(rgba(69, 69, 69, 0.32) 0deg ${animatedAngle}deg, #46cfa1 ${animatedAngle}deg)`,
        }}
      >
        <div>{circleInfo.left} GB</div>
        {circleInfo.left > 0 && (
          <div
            style={{ transform: `rotate(${animatedAngle - 90}deg) translateX(74px)` }}
            className={styles.marker}
          ></div>
        )}
      </div>
      <p className={styles.upd}>Обновляется ежемесячно</p>


      <label htmlFor="key">Ваш ключ для Outline</label>
        <div onClick={handleCopy} className={styles.line}>
          <div className={styles.copyField}>
            <span className={styles.key} 
            style={{ paddingLeft: isCopied ? '40px' : '0' }}>
              {isCopied
                ? 'Ключ cкопирован!'
                : keyV}
            </span>
          </div>
          <button className={styles.copyButton} type="button">
            <img src={copyIcon} alt="copy" />
          </button>
        </div>
        <p className={styles.copyState}>Нажмите, чтобы скопировать</p>

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
    </section>
  );
};

export default MainPage;
