import AddPaymentForm from "@/app/components/admin/workers/payment/addPayment";
import PaymentList from "@/app/components/admin/workers/payment/PaymentList";



export default function Page() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      
      {/* Add your form or content for adding payment here */}
      <AddPaymentForm />
      <PaymentList />
    </div>
  );
}