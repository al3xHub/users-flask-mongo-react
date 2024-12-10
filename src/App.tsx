import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { useUsers } from './hooks/useUsers';
import { User } from './types/user';

function App() {
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();

  const handleSubmit = (userData: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser(userData as Omit<User, 'id' | 'createdAt'>);
    }
    setIsFormOpen(false);
    setEditingUser(undefined);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingUser(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add User
            </button>
          </div>

          {isFormOpen ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h2>
              <UserForm
                user={editingUser}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg">
              <UserList
                users={users}
                onEdit={handleEdit}
                onDelete={deleteUser}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;