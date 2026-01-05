"use client";

import { useEffect, useState, useCallback } from "react";
import { User } from "@/app/types/admin/workers/view/worker";

interface FetchOptions {
  month?: number;
  year?: number;
}

export default function useWorkerDetail(id: string, options: FetchOptions = {}) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkerDetail = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/workers/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, options }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch worker details");
      }

      const result: User = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id, options]);

  useEffect(() => {
    fetchWorkerDetail();
  }, [id]);

  return {
    hours:data?.hours||[],userDetails:data,
    loading,
    error,
    refetch: fetchWorkerDetail,
  };
}
