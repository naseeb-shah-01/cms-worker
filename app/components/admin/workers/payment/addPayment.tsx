"use client";

import { useAddPayment } from "./hooks/useAddPayment";
import UserSelect from "@/app/components/ui/user/UserSelect";

export default function AddPaymentForm() {
  const {
    form,
    errors,
    loading,
    handleChange,
    submitPayment,
  } = useAddPayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitPayment();

    if (success) {
      alert("Payment added successfully");
    }
  };

  return (
    <div className="mx-auto mt-6 w-full max-w-3xl rounded-xl bg-white p-4 sm:p-6 shadow-lg border border-gray-200">
      <h2 className="mb-6 text-xl font-semibold text-black">
        Add Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: User + Amount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User */}
          <div>
            <label className="block text-sm font-medium text-black">
              Select Worker
            </label>
            <UserSelect
              value={form.user}
              onChange={handleChange}
            />
            {errors.user && (
              <p className="mt-1 text-sm text-black">
                {errors.user}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-black">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-black focus:ring-1 focus:ring-black outline-none"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-black">
                {errors.amount}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Remark (full width) */}
        <div>
          <label className="block text-sm font-medium text-black">
            Remark
          </label>
          <textarea
            name="remark"
            value={form.remark}
            onChange={handleChange}
            rows={3}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-black placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-48 rounded-lg bg-black py-2 text-white hover:bg-gray-900 disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : "Add Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
