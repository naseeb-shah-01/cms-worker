import { getAllWorkers } from "@/app/lib/actions/wokers";
import WorkersGrid from "../../components/admin/workers/WorkersGrid";
import Link from "next/link";

export default async function WorkersPage() {
  const allWorkers = await getAllWorkers();
  
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Workers Management</h1>
            <p className="text-gray-600 mt-1">
              Manage your team members, view details, and track performance
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
              Export List
            </button>
           <Link href={"/admin/workers/create"}> <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm font-medium" >
              Add New Worker
            </button></Link>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Total Workers</div>
            <div className="text-2xl font-bold text-gray-900">{allWorkers.length}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Active Workers</div>
            <div className="text-2xl font-bold text-gray-900">
              {allWorkers.filter(w => w.isActive).length}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Avg. Hourly Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              ${allWorkers.length > 0 
                ? (allWorkers.reduce((sum, w) => sum + w.hourlyRate, 0) / allWorkers.length).toFixed(2)
                : "0.00"
              }
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Workers ({allWorkers.length})
          </h2>
          
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search workers..."
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <WorkersGrid workers={allWorkers} />
      </div>
    </div>
  );
}