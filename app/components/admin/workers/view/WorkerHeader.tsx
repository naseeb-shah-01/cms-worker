import { User } from "@/app/types/admin/workers/view/worker";


interface WorkerHeaderProps {
  userDetails: User | null;
  onEdit: () => void;
  onContact: () => void;
}

export default function WorkerHeader({ userDetails, onEdit, onContact }: WorkerHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center text-white text-2xl font-bold">
              {userDetails?.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userDetails?.name}</h1>
              <p className="text-gray-600">{userDetails?.email}</p>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 bg-white">
            <span 
              className={`w-2 h-2 rounded-full ${userDetails?.isActive ? 'bg-gray-900' : 'bg-gray-400'}`}
            />
            <span className="text-sm font-medium">
              {userDetails?.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onEdit}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium"
          >
            Edit Worker
          </button>
          <button 
            onClick={onContact}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 text-sm font-medium"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}