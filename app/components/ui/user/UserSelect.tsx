"use client";

import { IUser, useUsers } from "./hooks/useUsers";

interface UserSelectProps {
  value: string;
  onChange: any;
  error?: string;
}

export default function UserSelect({
  value,
  onChange,
  error,
}: UserSelectProps) {
  const { users, loading } = useUsers();

  return (
    <div>
     

      <select
        value={value}
        onChange={onChange}
        name="user"
        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
      >
        <option value="">
          {loading ? "Loading users..." : "Select a Worker"}
        </option>

        {users.map((user: IUser) => (
          <option key={user._id} value={user._id}>
            {user.name}
            {user.email ? ` (${user.email})` : ""}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-black">{error}</p>}
    </div>
  );
}
