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

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: any;
  openInvoice: (invoiceUrl: string, callback: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void) => void;
}

export interface Telegram {
  WebApp: TelegramWebApp;
}

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export interface UserResponse {
  id: number;
  token: string;
  vpnPlan: string;
  gbLeft: number;
  gbTotal: number;
  planExpireDate: string;
}