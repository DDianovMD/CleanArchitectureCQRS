import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';
import AuthService from './AuthService';

// Extend AxiosRequestConfig to track retry state
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseUrl: string = 'https://localhost:7148/api';
const refreshUrl: string = 'https://localhost:7148/api/auth/refresh';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Queue variables to handle multiple simultaneous requests when token expires
let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor: Attach access token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = AuthService.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401s and Refresh Token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: CustomAxiosRequestConfig = error.config as CustomAxiosRequestConfig;

    // Handle 401 Unauthorized errors and prevent infinite retry loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh is already in progress, queue subsequent requests
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((error: any) => Promise.reject(error));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call backend refresh endpoint
        const refreshToken: string | null = AuthService.getRefreshToken();
        const refreshPayload: { refreshToken: string | null } = { refreshToken };
        const response = await axios.post(refreshUrl, refreshPayload);

        const { accessToken, newRefreshToken } = response.data;

        // Save new credentials
        AuthService.saveAccessToken(accessToken);
        if (newRefreshToken) {
          AuthService.saveRefreshToken(newRefreshToken);
        }

        const authHeader: string = `Bearer ${accessToken}`;

        // Update default header and process queued requests
        axiosInstance.defaults.headers.common.Authorization = authHeader;
        processQueue(null, accessToken);

        // Retry the original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = authHeader;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g., refresh token expired) -> force logout
        processQueue(refreshError as Error, null);
        AuthService.deleteTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;