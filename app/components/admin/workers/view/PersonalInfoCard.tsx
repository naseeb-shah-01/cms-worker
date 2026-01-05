import { User } from "@/app/types/admin/workers/view/worker";


interface PersonalInfoCardProps {
  userDetails: User | null;
}

export default function PersonalInfoCard({ userDetails }: PersonalInfoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <p className="font-medium text-gray-900">{userDetails?.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Email Address</label>
          <p className="font-medium text-gray-900">{userDetails?.email}</p>
        </div>
        {userDetails?.phone && (
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <p className="font-medium text-gray-900">{userDetails?.phone}</p>
          </div>
        )}
        <div>
          <label className="text-sm text-gray-600">Hourly Rate</label>
          <p className="font-medium text-gray-900">${userDetails?.hourlyRate}/hr</p>
        </div>
        {userDetails?.role && (
          <div>
            <label className="text-sm text-gray-600">Position</label>
            <p className="font-medium text-gray-900">{userDetails?.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}