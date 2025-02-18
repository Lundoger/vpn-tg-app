import Button from '../../../shared/button/Button';
import { TariffsCardProps } from '../../../types/types'
import clsx from 'clsx';
import styles from './TariffCard.module.scss'
import { useState } from 'react';
import { postInvoiceCreate } from '../../../api/api';

interface TariffCardProps {
  info: {
    name: string;
    limit: number;
    prices: {
      [key: string]: number;
    };
  };
  description: string[];
}

const TariffCard = ({ info, description }: TariffCardProps) => {
  const [activeDiscount, setActiveDiscount] = useState(1);
  
  const periods = {
    "1": "1 месяц",
    "6": "6 месяцев",
    "12": "12 месяцев"
  };

  const fullDescription = [
    ...description,
    `${info.limit} GB трафика ежемесячно`
  ];

  const handlePurchase = async () => {
    try {
      const { stars } = await postInvoiceCreate({ stars: info.prices[activeDiscount] });
      window.Telegram.WebApp.openInvoice(stars, (status) => {
        if (status === "paid") {
          // Можно добавить обновление данных после успешной оплаты
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className={styles.card}>
      <h2>{info.name}</h2>
      <ul className={styles.list}>
        {fullDescription.map((item, index) => (
          <li className={styles.listItem} key={index}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.price}>
        {Object.entries(info.prices).map(([period, price]) => (
          <div
            key={period}
            onClick={() => setActiveDiscount(Number(period))}
            className={clsx(
              styles.discount,
              activeDiscount === Number(period) && styles.active
            )}
          >
            <h3>{periods[period]}</h3>
            <p>⭐{price}</p>
          </div>
        ))}
      </div>

      {Object.keys(info.prices).length > 0 && (
        <Button
          text="Приобрести"
          className={styles.button}
          onClick={handlePurchase}
        />
      )}
    </div>
  );
};

export default TariffCard