import axios from 'axios';
import { User, CreateUserData, UpdateUserData } from '../types/user';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await api.post('/createuser', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};