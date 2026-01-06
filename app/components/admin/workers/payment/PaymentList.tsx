"use client";

import { useGetPayments } from "./hooks/useGetPayment";

export default function PaymentTable() {
  const { payments, loading } = useGetPayments();

  if (loading) {
    return (
      <div className="border border-black p-6 text-center text-black mt-6">
        Loading payments...
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="border border-black p-6 text-center text-black mt-6">
        No payments found
      </div>
    );
  }

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}
      <div className="space-y-4 mt-6 md:hidden">
        {payments.map((payment, index) => (
          <div
            key={payment._id}
            className="border border-black rounded-lg p-4 bg-white"
          >
            <div className="flex justify-between text-sm">
              <span className="font-semibold">#{index + 1}</span>
              <span className="text-xs">
                {new Date(payment.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold">User</p>
              <p className="text-xs font-mono">
                {payment?.user?.name}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold">Amount</p>
              <p className="font-bold">
                ₹ {payment.amount.toLocaleString()}
              </p>
            </div>

            <div className="mt-2">
              <p className="text-sm font-semibold">Remark</p>
              <p className="text-sm">
                {payment.remark || "-"}
              </p>
            </div>

            <div className="mt-2 text-xs">
              {new Date(payment.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto border border-black mt-6">
        <table className="w-full border-collapse text-sm text-black">
          <thead>
            <tr className="border-b border-black bg-white">
              <th className="p-3 text-left font-semibold">#</th>
              <th className="p-3 text-left font-semibold">Name</th>
              <th className="p-3 text-left font-semibold">Amount</th>
              <th className="p-3 text-left font-semibold">Remark</th>
              <th className="p-3 text-left font-semibold">Created At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="border-b border-black hover:bg-gray-100 transition"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-mono text-xs">
                  {payment?.user?.name}
                </td>

                <td className="p-3 font-semibold">
                  $ {payment.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  {payment.remark || "-"}
                </td>

                <td className="p-3 text-xs">
                  {new Date(payment.createdAt).toLocaleDateString()}{" "}
                  {new Date(payment.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
