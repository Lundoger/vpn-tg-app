import Button from '../../../shared/button/Button';
import clsx from 'clsx';
import styles from './TariffCard.module.scss'
import { useState } from 'react';
import { postInvoiceCreate } from '../../../api/api';
import star from '../../../assets/star.svg';
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
  const [isLoading, setIsLoading] = useState(false);
  
  const periods: Record<string, string> = {
    "1": "1 месяц",
    "6": "6 месяцев",
    "12": "12 месяцев"
  };

  const discounts: Record<string, number> = {
    "1": 0,
    "6": 15,
    "12": 25
  };

  const fullDescription = [
    ...description,
    `${info.limit} GB трафика ежемесячно`
  ];

  const getPriceWithDiscount = (period: string, price: number) => {
    if (info.name.toUpperCase() === 'ПРЕМИУМ' && discounts[period]) {
      const discount = discounts[period];
      return Math.floor(price * (1 - discount / 100));
    }
    return price;
  };

  const handlePurchase = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      const { link } = await postInvoiceCreate({ stars: info.prices[activeDiscount.toString()] });
      window.Telegram.WebApp.openInvoice(link, (status) => {
        if (status === "paid") {
          window.location.reload();
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
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
            <h3>{periods[period] || ''}</h3>
            <p className={styles.starContainer}><img src={star} alt="star" />{getPriceWithDiscount(period, price)}</p>
            {info.name.toUpperCase() === 'ПРЕМИУМ' && discounts[period] > 0 && (
              <div className={styles.star}>-{discounts[period]}%</div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(info.prices).length > 0 && (
        <Button
          text={isLoading ? "Загрузка..." : "Приобрести"}
          className={styles.button}
          onClick={handlePurchase}
          disabled={isLoading}
        />
      )}
    </div>
  );
};

export default TariffCard;