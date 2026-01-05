"use client";

import Link from "next/link";

type Worker = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  hourlyRate: number;
  isActive: boolean;
};

export default function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition duration-200">
  
    {/* Header */}
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {worker.name.charAt(0)}
          </span>
        </div>
        <h2 className="text-base font-semibold text-gray-900">
          {worker.name}
        </h2>
      </div>
  
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium border
          ${
            worker.isActive
              ? "bg-white text-gray-900 border-gray-300"
              : "bg-gray-100 text-gray-700 border-gray-200"
          }`}
      >
        {worker.isActive ? "Active" : "Inactive"}
      </span>
    </div>
  
    {/* Info */}
    <div className="space-y-2 mb-3">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-900 font-medium min-w-[70px]">Email:</span>
        <span className="text-gray-700 truncate">{worker.email}</span>
      </div>
  
      {worker.phone && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-900 font-medium min-w-[70px]">Phone:</span>
          <span className="text-gray-700">{worker.phone}</span>
        </div>
      )}
  
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-900 font-medium min-w-[70px]">Rate:</span>
        <span className="text-gray-700">${worker.hourlyRate}/hr</span>
      </div>
    </div>
  
    {/* Actions */}
    <div className="flex gap-2 pt-3 border-t border-gray-100">
      <Link href={`/admin/workers/view/${worker._id}`} >
      <button className="flex-1 text-sm bg-black text-white py-2 px-3 rounded-md hover:bg-gray-900 transition font-medium">
        View
      </button>
      </Link>
      <button className="flex-1 text-sm bg-white border border-gray-300 text-gray-900 py-2 px-3 rounded-md hover:bg-gray-50 transition font-medium">
        Edit
      </button>
    </div>
  </div>
  );
}
