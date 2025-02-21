import { useStore } from "../../store/store";
import TariffCard from "./TariffCard/TariffCard";
import styles from "./TariffsPage.module.scss";

const TariffsPage = () => {
  const tariffs = useStore((state) => state.tariffs);

  const description = [
    'YouTube в 4к и без рекламы!',
    'VPN который можно не выключать',
    'Нет ограничений по кол-ву устройств',
    'Скорость быстрее чем без VPN',
    'Установка за 30 секунд',
    'Мгновенное подключение️',
  ];

  return (
    <div className={styles.tariffPage}>
      {tariffs.map((item, index) => (
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
