import { useEffect, useState } from 'react';
import type { User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data: User[] = await res.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    loading,
    users,
    showError,
    fetchUsers,
    dismissError: () => setShowError(false),
  };
}
