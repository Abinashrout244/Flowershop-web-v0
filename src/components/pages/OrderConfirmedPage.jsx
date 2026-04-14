import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import NavHeader from "../homepage/NavHeader";

const OrderConfirmedPage = () => {
  const [order, setOrder] = useState(null);
  const [animDone, setAnimDone] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("flora_last_order");
    if (saved) setOrder(JSON.parse(saved));
    // trigger animation
    setTimeout(() => setAnimDone(true), 400);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Animated checkmark */}
        <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 transition-all duration-700
          ${animDone ? "bg-emerald-50 scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <CheckCircle size={64} className="text-emerald-500" strokeWidth={1.5} />
        </div>

        <div className={`transition-all duration-700 delay-300 ${animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-xs font-bold tracking-[0.3em] text-[#c9a87c] uppercase mb-3">Order Confirmed</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Thank You, {order?.address?.name?.split(" ")[0] || "Valued Customer"}! 🌸
          </h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8 font-light">
            Your order has been placed and our florists are already working on it. You'll receive a confirmation shortly.
          </p>
        </div>

        {/* Order card */}
        {order && (
          <div className={`bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-left mb-8 transition-all duration-700 delay-500
            ${animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

            <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 tracking-wide uppercase">Order Number</p>
                <p className="font-bold text-gray-900 font-serif-display text-lg">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 tracking-wide uppercase">Order Total</p>
                <p className="font-bold text-[#c9a87c] font-serif-display text-lg">₹{order.total?.toLocaleString()}</p>
              </div>
            </div>

            {/* Items recap */}
            <div className="space-y-3 mb-5">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.size} × {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* Status timeline */}
            <div className="bg-[#fdf8f0] rounded-2xl p-4 space-y-3">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Delivery Timeline</p>
              {[
                { icon: CheckCircle, label: "Order Confirmed", done: true,  sub: "Just now" },
                { icon: Package,    label: "Being Prepared",  done: true,  sub: "Our florists are crafting your order" },
                { icon: Truck,      label: "Out for Delivery", done: false, sub: "Estimated: " + (order.estimatedDelivery || "Today") },
                { icon: MapPin,     label: "Delivered",        done: false, sub: order.address ? `${order.address.address}, ${order.address.city}` : "" },
              ].map((step) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? "bg-emerald-500" : "bg-gray-200"}`}>
                    <step.icon size={14} className={step.done ? "text-white" : "text-gray-400"} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${step.done ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-700 ${animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            to="/flowers"
            className="flex-1 py-4 bg-[#c9a87c] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#b8966b] hover:shadow-xl transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile"
            className="flex-1 py-4 border border-gray-300 text-gray-700 font-bold text-sm tracking-widest uppercase rounded-full hover:border-gray-500 hover:bg-white transition-all"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmedPage;
