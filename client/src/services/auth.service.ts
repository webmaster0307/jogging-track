import { IAuthValues, ISignupValues } from '../sagas/auth';
import { api } from './api';

export const TOKEN_KEY = '@myApp-auth-token';

export function buildToken(token: string): string {
  return `Bearer ${token}`;
}

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, buildToken(token));
export const hasToken = (): boolean => Boolean(localStorage.getItem(TOKEN_KEY));

/**
 * logout
 */
export const logout = (): void => localStorage.removeItem(TOKEN_KEY);

/**
 * login
 * @param params 
 */
export const auth = (params: IAuthValues) => api.post('/auth/login', params);

/**
 * singup
 * @param params 
 */
export const signup = (params: ISignupValues) => api.post('/auth/signup', params);
