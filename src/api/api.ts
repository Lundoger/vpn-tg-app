import api from './config';

interface AuthResponse {
  token: string;
}

export const postAuth = async (data: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { initData: data });
  return response.data;
};

