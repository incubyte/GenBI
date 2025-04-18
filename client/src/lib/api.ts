import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from '@/components/ui/sonner';

// Define the base API URL
const API_URL = 'http://localhost:3000/api/v1';

// Create a custom axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    
    // Handle different error statuses
    if (response) {
      const status = response.status;
      const data = response.data as any;
      
      // Show error message
      const errorMessage = data.message || 'An error occurred';
      
      if (status === 401) {
        toast.error('Authentication error. Please log in again.');
        // Handle logout if needed
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status === 404) {
        toast.error('Resource not found.');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(errorMessage);
      }
    } else {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to make API calls
export const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api[method](url, method === 'get' ? config : data, method !== 'get' ? config : undefined);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
