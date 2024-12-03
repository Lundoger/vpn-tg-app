import React, { memo } from 'react';
import { IMenuItem } from '../../types/types';
import clsx from 'clsx';
import styles from './Navigation.module.scss';

interface NavigationProps {
  items: IMenuItem[];
  activeItem: string;
  onItemSelect: (label: string) => void;
}

const Navigation: React.FC<NavigationProps> = memo(
  ({ items, activeItem, onItemSelect }) => (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map(({ label, icon }) => (
          <li
            key={label}
            className={clsx(
              styles.listItem,
              label === activeItem && styles.active,
            )}
            onClick={() => onItemSelect(label)}
          >
            <div className={styles.imageContainer}>
              <img src={icon} alt={`${label} icon`} />
            </div>
            <span className="istok-web">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  ),
);

export default Navigation;