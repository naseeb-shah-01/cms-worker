import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  name: string;
  email?: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/workers/all"); // 👈 your API
        const data = await res.json();
        if(data?.workers)
        setUsers(data?.workers);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};
