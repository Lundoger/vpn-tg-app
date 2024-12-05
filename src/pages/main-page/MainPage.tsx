import { useEffect, useRef, useState } from 'react';

import Button from '../../shared/button/Button';
import clsx from 'clsx';
import styles from './MainPage.module.scss';

const MainPage = () => {
  const [keyV, setKeyV] = useState<string>(
    'ss://hD12SN123JNSHBjDHb2V2gn12n323as',
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // при фетче ключа расскоментить
  // useEffect(() => {
  //   setKeyV('ss://hD12SN123JNSHBjDHb2V2gn12n323as');
  // }, []);

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

  return (
    <section className={styles.section}>
      <h2>Осталось</h2>
      <div className={styles.circle}>377 GB</div>
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
            Премиум
          </span>
        </p>
        <p>
          Действует до: <span className={styles.date}>27/12/2025</span>
        </p>
      </div>

      <Button text="Продлить"></Button>

      <div className={clsx(styles.copied, isCopied && styles.active)}>
        Ключ скопирован!
      </div>
    </section>
  );
};

export default MainPage;
