import { useState } from 'react';
import { User } from '../types/user';

// This is a mock implementation that will be replaced with actual API calls later
export function useUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
  };
}