"use client";

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
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          {worker.name}
        </h2>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium
            ${
              worker.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {worker.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Email:</span>{" "}
          {worker.email}
        </p>

        {worker.phone && (
          <p>
            <span className="font-medium text-gray-800">Phone:</span>{" "}
            {worker.phone}
          </p>
        )}

        <p>
          <span className="font-medium text-gray-800">Hourly Rate:</span>{" "}
          ${worker.hourlyRate}/hr
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <button className="flex-1 text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          View
        </button>

        <button className="flex-1 text-sm border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
          Edit
        </button>
      </div>
    </div>
  );
}
