import Button from '../../../shared/button/Button';
import { TariffsCardProps } from '../../../types/types'
import clsx from 'clsx';
import styles from './TariffCard.module.scss'
import { useState } from 'react';

const TariffsCard = ({ info }: TariffsCardProps) => {
    const [activeDiscount, setActiveDiscount] = useState(4);
    return (
        <div className={styles.card}>
            <h2>{info.type}</h2>
            <ul className={styles.list}>
                {info.description.map((item, index) => (
                    <li className={styles.listItem} key={index}>
                        {item}
                    </li>
                ))}
            </ul>

            <div className={styles.price}>
                <div onClick={() => setActiveDiscount(0)} className={clsx(styles.discount, activeDiscount === 0 && styles.active)}>
                    <h3>1 месяц</h3>
                    <p>⭐{info.price[0]}</p>
                    {info.discount[0] > 0 && <div className={styles.star}>-{info.discount[0]}%</div>}
                </div>

                <div onClick={() => setActiveDiscount(1)} className={clsx(styles.discount, activeDiscount === 1 && styles.active)}>
                    <h3>6 месяцев</h3>
                    <p>⭐{info.price[1]}</p>
                    {info.discount[1] > 0 && <div className={styles.star}>-{info.discount[1]}%</div>}
                </div>

                <div onClick={() => setActiveDiscount(2)} className={clsx(styles.discount, activeDiscount === 2 && styles.active)}>
                    <h3>12 месяцев</h3>
                    <p>⭐{info.price[2]}</p>
                    {info.discount[2] > 0 && <div className={styles.star}>-{info.discount[2]}%</div>}
                </div>
            </div>

            <Button
                text="Приобрести"
                className={styles.button}
            />
        </div >
    )
}

export default TariffsCard