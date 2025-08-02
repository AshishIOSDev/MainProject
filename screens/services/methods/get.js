// services/methods/get.js
import { BASE_URL } from '../constants/baseUrl';
import { checkNetwork } from '../utils/networkCheck';

export const get = async (endpoint) => {
  const isConnected = await checkNetwork();
  if (!isConnected) throw new Error('No internet connection');

  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error('Failed to fetch data');

  return await response.json();
};
