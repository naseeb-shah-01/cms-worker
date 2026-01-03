
"use client";

import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useHours() {
  // Custom hook logic for managing hours can be implemented here
  const [hours, setHours] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const userName = session?.user?.name || "Worker";
  const fetchHours = async (workerId: string) => {
    setLoading(true);
    let data = await fetch(`/api/workers/hours/${workerId}`);
    let hoursData = (await (await data).json())?.data;
    setHours(hoursData);
    setLoading(false);
  };
  useEffect(() => {

    if(session?.user.id)  
        
    fetchHours(session?.user.id);
  }, [session?.user.id]);
  return {
    hours,loading,userName
    // Return any state or functions related to hours management
  };
}
