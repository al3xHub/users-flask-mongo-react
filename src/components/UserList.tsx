import React from 'react';
import { Loader2 } from 'lucide-react';
import { User } from '../types/user';
import { UserRow } from './UserRow';

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserList({ users, isLoading, error, onEdit, onDelete }: UserListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading users: {error.message}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserRow 
              key={user.id} 
              user={user} 
              onEdit={() => onEdit(user)} 
              onDelete={() => onDelete(user.id)} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}