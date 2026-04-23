import { Check, ShieldCheck, Zap } from "lucide-react";

const CheckoutSidebar = ({
  items,
  subtotal,
  promo,
  discountAmt,
  deliveryFee,
  total,
}) => (
  <div className="lg:col-span-5 h-full">
    <div className="sticky top-28 h-full bg-gradient-to-br from-white/90 via-white/80 to-[#fdf8f0]/40 rounded-[2.5rem] p-8 border border-white/60 shadow-2xl shadow-gray-300/20 backdrop-blur-xl">
      <h3 className="text-xl font-serif text-gray-900 mb-6 border-b border-gray-100/50 pb-6">
        Your Selection
      </h3>

      <div className="max-h-[300px] overflow-y-auto pr-2 mb-8 space-y-6 custom-scrollbar">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex gap-4 group p-3 hover:bg-white/30 rounded-2xl transition-all duration-300"
          >
            <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex-1 py-1">
              <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                {item.name}
              </h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                {item.size} • Qty {item.qty}
              </p>
              <p className="text-sm font-serif text-[#c9a87c] mt-3 font-bold">
                ₹{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-gray-100/50">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
        {promo.applied && (
          <div className="flex justify-between text-sm p-2 bg-emerald-50/50 rounded-lg border border-emerald-200/30">
            <span className="text-emerald-600 font-medium flex items-center gap-1.5">
              <Zap size={14} />
              Rewards Discount
            </span>
            <span className="text-emerald-600 font-bold">
              −₹{discountAmt.toLocaleString()}
            </span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Standard Delivery</span>
          <span
            className={`font-medium ${
              deliveryFee === 0
                ? "text-emerald-600 font-bold flex items-center gap-1"
                : "text-gray-900"
            }`}
          >
            {deliveryFee === 0 ? (
              <>
                <Check size={14} /> Complimentary
              </>
            ) : (
              `₹${deliveryFee}`
            )}
          </span>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-900/5 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Total Payable
            </p>
            <p className="text-4xl font-serif text-gray-900 font-bold">
              ₹{total.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-400 leading-tight italic">
              Incl. of all taxes
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 rounded-2xl border border-emerald-200/30 text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
        <ShieldCheck size={14} />
        <span>Encrypted & Secured</span>
      </div>
    </div>
  </div>
);

export default CheckoutSidebar;
