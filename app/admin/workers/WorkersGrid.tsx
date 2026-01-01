"use client";

import WorkerCard from "./WorkerCard";
type Worker = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    hourlyRate: number;
    isActive: boolean;
  };
export default function WorkersGrid({ workers }:{workers:Worker[]}) {
  if (!workers.length) {
    return (
      <p className="text-gray-500 text-sm">
        No workers found.
      </p>
    );
  }

  return (
    <div
    className="
      grid
      grid-cols-1
      gap-4
      sm:gap-5
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    "
  >
    {workers.map((worker) => (
      <WorkerCard key={worker._id} worker={worker} />
    ))}
  </div>
  
  );
}
