import axios, { AxiosError, AxiosRequestConfig, AxiosResponse  } from 'axios';
import config from '../config';
import { getToken, hasToken } from './auth.service';
// import store from '../../redux/store'
// import { logout } from '../../redux/actions/auth'

/**
 * api definition
 */
export const api = axios.create({
  baseURL: config.apiBaseUrl
});

/**
 * request api call intercepter
 */
api.interceptors.request.use((newConfig: AxiosRequestConfig) => {
  if (hasToken() && !newConfig.headers.authorization) {
    newConfig.headers.authorization = getToken();
  }
  return newConfig;
});

/** 
 * response api call intercepter 
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
        return error;
    }

    const { status } = error.response;
    if (!status || (status && status === 401)) {
    // log out
    //   store.dispatch(logout());
    }

    return error;
  }
);
