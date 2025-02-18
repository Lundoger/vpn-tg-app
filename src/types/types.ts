export interface IMenuItem {
  label: string;
  component: React.ReactNode;
  icon: string;
}

export interface TariffsCardProps {
  info: {
      type: string;
      price: number[];
      discount: number[];
      description: string[]
  };
}

export interface Tariff {
  name: string;
  limit: number;
  prices: {
    [key: string]: number;
  };
}