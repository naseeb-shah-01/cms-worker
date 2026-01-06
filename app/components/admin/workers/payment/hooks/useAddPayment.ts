import { useState } from "react";
import { z } from "zod";

const addPaymentSchema = z.object({
  user: z.string().min(1, "User is required"),
  
  amount: z.number().positive("Amount must be greater than 0"),
  remark: z.string().optional(),
});

export type AddPaymentForm = z.infer<typeof addPaymentSchema>;

export const useAddPayment = () => {
  const [form, setForm] = useState<AddPaymentForm>({
    user: "",
    
    amount: 0,
    remark: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const submitPayment = async () => {
    setErrors({});

    const result = addPaymentSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      
      setErrors(fieldErrors);
      return false;
    }

    try {
      setLoading(true);

      await fetch("/api/admin/workers/payment/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({
        user: "",
        
        amount: 0,
        remark: "",
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    submitPayment,
  };
};
