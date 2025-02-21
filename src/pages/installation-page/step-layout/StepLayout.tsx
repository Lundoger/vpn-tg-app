import React, { useRef, useState } from 'react';
import CarouselButton from '../carousel-button/CarouselButton';
import clsx from 'clsx';
import connectionImage from '../../../assets/installation/connections-img.png';
import copyIcon from '../../../assets/copy-icon.svg';
import { installationLinks } from '../../../constants/installation';
import step3Image from '../../../assets/installation/step-3-img.png';
import step4Image from '../../../assets/installation/step-4-img.png';
import step5Image from '../../../assets/installation/step-5-img.png';
import styles from './StepLayout.module.scss';
import { useStore } from '../../../store/store';

interface StepLayoutProps {
  title: string;
  children: React.ReactNode;
}

const StepLayout = ({ title, children }: StepLayoutProps) => {
  return (
    <article className={styles.step}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
        <CarouselButton
          className={clsx(styles.buttonLeft, 'installation-prev-el')}
        />
        <CarouselButton
          className={clsx(styles.buttonRight, 'installation-next-el')}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </article>
  );
};

const Step1 = () => {
  const handleLinkClick = (link: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.Telegram.WebApp.openLink(link);
  };

  return (
    <>
      <ul style={{ marginBottom: 50 }} className={styles.list}>
        <li className={styles.listItem}>Установите приложение Outline</li>
      </ul>
      <p className={styles.label}>Ссылки на установку</p>
      <div className={styles.actions}>
        {installationLinks.map(({ label, icon, link }) => (
          <a 
            key={label} 
            href={link} 
            className={styles.installationLink}
            onClick={handleLinkClick(link)}
          >
            <img src={icon} alt={`${label} icon`} />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </>
  );
};

StepLayout.Step1 = Step1;

const Step2 = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const user = useStore((state) => state.user);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (!user?.token) return;
    
    setIsCopied(true);
    navigator.clipboard.writeText(user.token);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      timeoutRef.current = null;
    }, 4000);
  };

  return (
    <>
      <ul style={{ marginBottom: 35 }} className={styles.list}>
        <li className={styles.listItem}>Скопируйте ключ</li>
      </ul>
      <div onClick={handleCopy} className={styles.line}>
        <div className={styles.copyField}>
          <span className={styles.key}
          style={{ paddingLeft: isCopied ? '40px' : '0' }}>
            {isCopied
              ? 'Ключ cкопирован!'
              : user?.token || '******************************'}
          </span>
        </div>
        <button className={styles.copyButton} type="button">
          <img src={copyIcon} alt="copy" />
        </button>
      </div>
      <p className={styles.copyState}>Нажмите, чтобы скопировать</p>
    </>
  );
};

StepLayout.Step2 = Step2;

const Step3 = () => {
  return (
    <>
      <ul style={{ marginBottom: 20 }} className={styles.list}>
        <li className={styles.listItem}>Откройте приложение Outline</li>
        <li className={styles.listItem}>Нажмите " + " в правом верхнем углу</li>
      </ul>
      <div className={styles.imgContainer}>
        <img src={step3Image} alt="step-3 image" />
      </div>
    </>
  );
};

StepLayout.Step3 = Step3;

const Step4 = () => {
  return (
    <>
      <ul style={{ marginBottom: 20 }} className={styles.list}>
        <li className={styles.listItem}>
          Вставьте скопированный ключв это поле
        </li>
      </ul>
      <div className={styles.imgContainer}>
        <img src={step4Image} alt="step-4 image" />
      </div>
    </>
  );
};

StepLayout.Step4 = Step4;

const Step5 = () => {
  return (
    <>
      <ul style={{ marginBottom: 20 }} className={styles.list}>
        <li className={styles.listItem}>Нажмите кнопку "Добавить сервер"</li>
      </ul>
      <div className={styles.imgContainer}>
        <img src={step5Image} alt="step-5 image" />
      </div>
    </>
  );
};

StepLayout.Step5 = Step5;

const Connection = () => {
  return (
    <>
      <p style={{ marginBottom: 20 }} className={styles.desc}>
        Для включения или отключения впн достаточно нажать лишь одну кнопку
        "Подключить" или "Отключить"
      </p>
      <div className={styles.imgContainer}>
        <img src={connectionImage} alt="connection image" />
      </div>
    </>
  );
};

StepLayout.Connection = Connection;

export default StepLayout;
