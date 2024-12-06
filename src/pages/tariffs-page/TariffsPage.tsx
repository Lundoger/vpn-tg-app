import { useEffect, useState } from "react";

import TariffCard from "./TariffCard/TariffCard";
import styles from "./TariffsPage.module.scss";

interface Tariff {
  type: string;
  price: number[];
  discount: number[];
  description: string[];
}

const TariffsPage = () => {
  const [data, setData] = useState<Tariff[]>([]);

  useEffect(() => {
    setData([
      {
        type: "премиум",
        price: [55, 199, 449],
        discount: [0, 15, 25],
        description: [
          'YouTube в 4к и без рекламы!',
          'VPN который можно не выключать',
          'Нет ограничений по кол-ву устройств',
          'Скорость быстрее чем без VPN',
          'Установка за 30 секунд',
          'Мгновенное подключение️',
          '500 GB трафика ежемесячно',
          'Доступные цены',
        ]
      },
      {
        type: "премиум",
        price: [55, 199, 449],
        discount: [0, 15, 25],
        description: [
          'YouTube в 4к и без рекламы!',
          'VPN который можно не выключать',
          'Нет ограничений по кол-ву устройств',
          'Скорость быстрее чем без VPN',
          'Установка за 30 секунд',
          'Мгновенное подключение️',
          '500 GB трафика ежемесячно',
          'Доступные цены',
        ]
      },
      {
        type: "премиум",
        price: [55, 199, 449],
        discount: [0, 15, 25],
        description: [
          'YouTube в 4к и без рекламы!',
          'VPN который можно не выключать',
          'Нет ограничений по кол-ву устройств',
          'Скорость быстрее чем без VPN',
          'Установка за 30 секунд',
          'Мгновенное подключение️',
          '500 GB трафика ежемесячно',
          'Доступные цены',
        ]
      },
    ]);
  }, []);
  return (
    <div className={styles.tariffPage}>
      {data.map((item, index) => (
        <TariffCard key={index} info={item} />
      ))}
    </div>
  );
};

export default TariffsPage;
