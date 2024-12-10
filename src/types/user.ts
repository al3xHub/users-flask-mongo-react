export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'lastLogin'>;
export type UpdateUserData = Partial<CreateUserData>;