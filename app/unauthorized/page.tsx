import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="max-w-md w-full text-center border border-black/20 rounded-lg p-8">
        {/* Status */}
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 rounded-full border border-black flex items-center justify-center text-2xl font-bold">
            403
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2">
          Unauthorized Access
        </h1>

        {/* Description */}
        <p className="text-sm text-black/70 mb-6">
          You don’t have permission to access this page.
          Please contact your administrator or return safely.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="w-full border border-black py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/login"
            className="w-full border border-black/30 py-2 rounded-md text-sm font-medium text-black/80 hover:border-black hover:text-black transition"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
