import { User } from "@/app/types/admin/workers/view/worker";


interface EmploymentDetailsCardProps {
  userDetails: User | null;
}

export default function EmploymentDetailsCard({ userDetails }: EmploymentDetailsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Status</label>
          <div className="flex items-center gap-2">
            <span 
              className={`w-2 h-2 rounded-full ${userDetails?.isActive ? 'bg-gray-900' : 'bg-gray-400'}`}
            />
            <span className="font-medium text-gray-900">
              {userDetails?.isActive ? 'Active Employee' : 'Inactive'}
            </span>
          </div>
        </div>
        {userDetails?.createdAt && (
          <div>
            <label className="text-sm text-gray-600">Hire Date</label>
            <p className="font-medium text-gray-900">
              {new Date(userDetails.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}