import api from './config';

interface AuthResponse {
  token: string;
}

export const postAuth = async (data: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { initData: data });
  console.log('response', response);
  return response.data;
};

