import React from 'react';
import styles from './StepLayout.module.scss';

interface StepLayoutProps {
  title: string;
  children: React.ReactNode;
}

const StepLayout = ({ title, children }: StepLayoutProps) => {
  return (
    <article className={styles.step}>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>{children}</div>
    </article>
  );
};

export default StepLayout;
