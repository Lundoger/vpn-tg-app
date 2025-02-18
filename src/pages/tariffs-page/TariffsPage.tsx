import { useEffect, useState } from "react";

import TariffCard from "./TariffCard/TariffCard";
import styles from "./TariffsPage.module.scss";
import { getPlanInfo } from "../../api/api";
import { Tariff } from '../../types/types';

const TariffsPage = () => {
  const [data, setData] = useState<Tariff[]>([]);

  const description = [
    'YouTube в 4к и без рекламы!',
    'VPN который можно не выключать',
    'Нет ограничений по кол-ву устройств',
    'Скорость быстрее чем без VPN',
    'Установка за 30 секунд',
    'Мгновенное подключение️',
  ];

  useEffect(() => {
    const fetchPlanInfo = async () => {
      const planInfo = await getPlanInfo();
      setData(planInfo);
    };
    fetchPlanInfo();
  }, []);

  return (
    <div className={styles.tariffPage}>
      {data.map((item, index) => (
        <TariffCard 
          key={index} 
          info={item} 
          description={description}
        />
      ))}
    </div>
  );
};

export default TariffsPage;
