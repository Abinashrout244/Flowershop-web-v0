import { Banknote, Check, CreditCard, ShieldCheck, Smartphone } from "lucide-react";

const paymentMethods = [
  {
    id: "upi",
    title: "UPI Transfer",
    sub: "Google Pay, PhonePe, Paytm",
    icon: Smartphone,
  },
  {
    id: "card",
    title: "Secure Card",
    sub: "Visa, Mastercard, Amex",
    icon: CreditCard,
  },
  {
    id: "cod",
    title: "Pay on Delivery",
    sub: "Cash or QR at your door",
    icon: Banknote,
  },
];

const PaymentSection = ({ payMethod, onSelect }) => (
  <section className="bg-gradient-to-br from-white/80 via-white/60 to-[#fdf8f0]/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white/70 shadow-2xl shadow-gray-300/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fdf8f0] to-[#f5e6d3] flex items-center justify-center text-[#c9a87c] shadow-md shadow-[#c9a87c]/10">
        <ShieldCheck size={20} />
      </div>
      <h2 className="text-2xl font-serif text-gray-900">Payment Secured</h2>
    </div>

    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`group relative flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
            payMethod === method.id
              ? "border-[#c9a87c] bg-gradient-to-br from-white via-white to-[#fdf8f0]/30 shadow-xl shadow-[#c9a87c]/20"
              : "border-gray-100 bg-gradient-to-br from-gray-50/50 to-white/50 hover:border-gray-200 hover:shadow-md hover:shadow-gray-200/40"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9a87c]/0 via-[#c9a87c]/5 to-[#c9a87c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div
            className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              payMethod === method.id
                ? "bg-gradient-to-br from-[#c9a87c] to-[#b8966b] text-white shadow-lg shadow-[#c9a87c]/30"
                : "bg-gradient-to-br from-white to-gray-50 text-gray-400 group-hover:shadow-md"
            }`}
          >
            <method.icon size={22} />
          </div>
          <div className="flex-1 relative">
            <h4 className="font-bold text-sm text-gray-900">{method.title}</h4>
            <p className="text-xs text-gray-400">{method.sub}</p>
          </div>
          <div
            className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              payMethod === method.id
                ? "border-[#c9a87c] bg-gradient-to-br from-[#c9a87c] to-[#b8966b] shadow-lg shadow-[#c9a87c]/30"
                : "border-gray-200 group-hover:border-gray-300"
            }`}
          >
            {payMethod === method.id && <Check size={12} className="text-white" />}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PaymentSection;
