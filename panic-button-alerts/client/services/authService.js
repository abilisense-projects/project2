import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigateFunction } from 'react-router-dom'; // Assuming you're using react-router-dom in your React app

import snackBarStore from '../components/common/Snackbar/store/snackBarStore';

// Replace YOUR_NODE_SERVER_ENDPOINT with the actual endpoint
const API_BASE_URL = 'YOUR_NODE_SERVER_ENDPOINT';

export const signup = async (payload, redirectTo) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/user`, payload);
    await storeTokens(data.accessToken, data.refreshToken);
    redirectTo('/dashboard');
    snackBarStore.showSnackBar('Signup success', 'success');
  } catch (error) {
    handleAuthError(error, 'Problem in Signup');
  }
};

export const login = async (payload, redirectTo) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/user/login`, payload);
    await storeTokens(data.accessToken, data.refreshToken);
    redirectTo('/dashboard');
    snackBarStore.showSnackBar('Login success', 'success');
  } catch (error) {
    handleAuthError(error, 'Problem in login');
  }
};

export const forgotPassword = async (email) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    snackBarStore.showSnackBar('Instruction sent successfully', 'success');
    return true;
  } catch (error) {
    handleAuthError(error, 'Problem in forgot password');
    return false;
  }
};

export const verifyToken = async (token) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/verify-token`, { token });
    return true;
  } catch (error) {
    handleAuthError(error, 'Problem in token verification');
    return false;
  }
};

export const resetPassword = async (token, password) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/reset-password`, { token, password });
    snackBarStore.showSnackBar('Reset successfully', 'success');
    return true;
  } catch (error) {
    handleAuthError(error, 'Problem in password reset');
    return false;
  }
};

export const handleRefreshToken = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/auth/refresh-token`);
    await storeTokens(data.accessToken, data.refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (redirectTo) => {
  await clearTokens();
  redirectTo('/login');
};

const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
};

const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

const handleAuthError = (error, defaultMessage) => {
  snackBarStore.showSnackBar(`Problem: ${error.response?.data || defaultMessage}`, 'error');
  console.log(error);
};
