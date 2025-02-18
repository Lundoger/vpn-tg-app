import api from './config';
import { Tariff } from '../types/types';

interface AuthResponse {
  token: string;
}

interface InvoiceResponse {
  stars: string;
}

interface UserResponse {
  id: number;
  token: string;
  vpnPlan: string;
  gbLeft: number;
  gbTotal: number;
  planExpireDate: string;
}

export const postAuth = async (data: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/telegram/login', { initData: data });
  console.log('response', response);
  return response.data;
};

export const postInvoiceCreate = async (data: { stars: number }): Promise<InvoiceResponse> => {
  const response = await api.post<InvoiceResponse>('/invoice/create', data);
  return response.data;
};

export const getUserMe = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/user/me');
  return response.data;
};

export const getPlanInfo = async (): Promise<Tariff[]> => {
  const response = await api.get<Tariff[]>('/plan/info');
  return response.data;
};



