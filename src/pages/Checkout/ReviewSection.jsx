import { Banknote, CreditCard, Smartphone } from "lucide-react";

const ReviewSection = ({ form, payMethod, onEditShipping, onEditPayment }) => (
  <section className="bg-gradient-to-br from-white/80 via-white/60 to-[#fdf8f0]/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white/70 shadow-2xl shadow-gray-300/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h2 className="text-2xl font-serif text-gray-900 mb-8">Confirm Details</h2>
    <div className="grid gap-6">
      <div className="group p-6 bg-gradient-to-br from-[#fdf8f0]/60 to-[#f5e6d3]/30 rounded-3xl border border-[#c9a87c]/20 hover:border-[#c9a87c]/40 transition-all hover:shadow-lg hover:shadow-[#c9a87c]/10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a87c]">
            Deliver To
          </span>
          <button
            onClick={onEditShipping}
            className="text-[10px] underline text-gray-400 hover:text-[#c9a87c] transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="font-bold text-gray-900 mb-1">{form.name}</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {form.address}, {form.city}, {form.state} - {form.pincode}
        </p>
        <p className="text-sm text-gray-600 mt-2 font-medium">{form.phone}</p>
      </div>

      <div className="group p-6 bg-gradient-to-br from-gray-50/60 to-gray-100/30 rounded-3xl border border-gray-200/60 hover:border-gray-300 transition-all hover:shadow-lg hover:shadow-gray-200/40">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Payment Method
          </span>
          <button
            onClick={onEditPayment}
            className="text-[10px] underline text-gray-400 hover:text-gray-900 transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-gray-50 flex items-center justify-center text-gray-900 shadow-md">
            {payMethod === "upi" ? (
              <Smartphone size={16} />
            ) : payMethod === "card" ? (
              <CreditCard size={16} />
            ) : (
              <Banknote size={16} />
            )}
          </div>
          <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
            {payMethod === "upi"
              ? "UPI Transfer"
              : payMethod === "card"
                ? "Secure Card"
                : "Pay on Delivery"}
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default ReviewSection;
