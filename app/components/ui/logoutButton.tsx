
"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Optional: Redirect after logout
    const data = await signOut({ 
      redirect: false, // We'll handle redirect manually
      callbackUrl: "/login" // Where to redirect after logout
    });
    
    // Redirect to login page
    router.push(data.url);
    router.refresh(); // Refresh the router cache
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}