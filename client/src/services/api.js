import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get('/dashboard/stats');
  return res.data;
};

export const getCustomers = async () => {
  const res = await api.get('/customers');
  return res.data.data;
};

export const getCustomerById = async (id) => {
  const res = await api.get(`/customers/${id}`);
  return res.data.data;
};

export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params });
  return res.data.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data.data;
};

export const getInterests = async () => {
  const res = await api.get('/interests');
  return res.data.data;
};

export const getGraphData = async (params = {}) => {
  const res = await api.get('/graph', { params });
  return res.data;
};

export const generateRecommendations = async (customerId, weights = null) => {
  const payload = { customerId };
  if (weights) payload.weights = weights;
  const res = await api.post('/recommendations', payload);
  return res.data.data;
};

export const simulatePurchase = async (customerId, productId) => {
  const res = await api.post('/purchases', { customerId, productId });
  return res.data;
};

export const getPurchases = async () => {
  const res = await api.get('/purchases');
  return res.data.data;
};

export const seedDatabase = async () => {
  const res = await api.post('/seed');
  return res.data;
};

export default api;
