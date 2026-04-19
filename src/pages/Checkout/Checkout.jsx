import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, Check, CreditCard, Smartphone, Banknote, MapPin, User, Phone, Mail } from "lucide-react";
import { selectCartItems, selectCartSubtotal, selectPromo, clearCart } from "../../features/cart/cartSlice";
import NavHeader from "../../components/layout/Navbar/Navbar";

const DELIVERY_FEE = 99;

const steps = ["Delivery", "Payment", "Review"];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const promo = useSelector(selectPromo);

  const discountAmt = promo.applied ? Math.round(subtotal * promo.discount / 100) : 0;
  const deliveryFee = subtotal >= 999 ? 0 : DELIVERY_FEE;
  const total = subtotal - discountAmt + deliveryFee;

  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
    city: "Mumbai", state: "Maharashtra", pincode: "",
  });
  const [errors, setErrors] = useState({});

  const handleField = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const validateStep0 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (form.phone.length < 10) errs.phone = "Invalid phone";
    if (!form.address.trim()) errs.address = "Required";
    if (form.pincode.length !== 6) errs.pincode = "6 digits required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (step === 0 && !validateStep0()) return;
    setStep(s => s + 1);
  };

  const placeOrder = () => {
    setPlacing(true);
    // Save order to localStorage
    const order = {
      id: `FB${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" }),
      items, total, address: form, payMethod,
      status: "Confirmed",
      estimatedDelivery: new Date(Date.now() + 86400000).toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" }),
    };
    const prev = JSON.parse(localStorage.getItem("flora_orders") || "[]");
    localStorage.setItem("flora_orders", JSON.stringify([order, ...prev]));
    localStorage.setItem("flora_last_order", JSON.stringify(order));
    setTimeout(() => {
      dispatch(clearCart());
      navigate("/order-confirmed");
    }, 1800);
  };

  const Field = ({ name, label, icon: Icon, type="text", placeholder="" }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
        <input
          name={name} type={type} value={form[name]} onChange={handleField}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-[#c9a87c] transition-colors
            ${errors[name] ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"}`}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/cart" className="hover:text-[#c9a87c]">Cart</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="font-serif-display text-3xl font-light text-gray-900 mb-8">Checkout</h1>

        {/* Step Progress */}
        <div className="flex items-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                  ${i < step ? "bg-emerald-500 text-white"
                    : i === step ? "bg-[#c9a87c] text-white shadow-lg scale-110"
                    : "bg-gray-100 text-gray-400"}`}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                <p className={`text-xs font-semibold mt-1.5 ${i === step ? "text-[#c9a87c]" : "text-gray-400"}`}>{s}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all duration-500 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ─────────────────────────── */}
          <div className="lg:col-span-2">

            {/* STEP 0: Delivery */}
            {step === 0 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-6">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field name="name"    label="Full Name"    icon={User}  placeholder="Priya Sharma" />
                  <Field name="phone"   label="Phone"        icon={Phone} placeholder="9876543210" />
                  <div className="sm:col-span-2">
                    <Field name="email" label="Email"        icon={Mail}  type="email" placeholder="priya@example.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Delivery Address</label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <textarea
                        name="address" value={form.address} onChange={handleField} rows={2}
                        placeholder="Flat / House No., Street, Area"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-[#c9a87c] resize-none transition-colors
                          ${errors.address ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                      />
                    </div>
                    {errors.address && <p className="text-xs text-red-400 mt-1">{errors.address}</p>}
                  </div>
                  <Field name="city"    label="City"    placeholder="Mumbai" />
                  <Field name="pincode" label="Pincode" placeholder="400001" />
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">State</label>
                    <select
                      name="state" value={form.state} onChange={handleField}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a87c]"
                    >
                      {["Maharashtra","Delhi","Karnataka","Tamil Nadu","Gujarat","Rajasthan","West Bengal"].map(s=>(
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 1: Payment */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { key:"upi",  label:"UPI / QR Code",       icon: Smartphone, sub:"Google Pay, PhonePe, Paytm, BHIM" },
                    { key:"card", label:"Credit / Debit Card",  icon: CreditCard, sub:"Visa, Mastercard, Amex, RuPay" },
                    { key:"cod",  label:"Cash on Delivery",     icon: Banknote,   sub:"Pay when delivered" },
                  ].map(m => (
                    <button
                      key={m.key}
                      onClick={() => setPayMethod(m.key)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all
                        ${payMethod === m.key ? "border-[#c9a87c] bg-[#fdf8f0]" : "border-gray-200 bg-white hover:border-gray-300"}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${payMethod === m.key ? "bg-[#c9a87c] text-white" : "bg-gray-100 text-gray-500"}`}>
                        <m.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{m.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{m.sub}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${payMethod === m.key ? "border-[#c9a87c] bg-[#c9a87c]" : "border-gray-300"}`}>
                        {payMethod === m.key && <Check size={10} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {payMethod === "upi" && (
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">UPI ID</label>
                    <input placeholder="name@upi" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a87c]" />
                  </div>
                )}
                {payMethod === "card" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Card Number</label>
                      <input placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a87c]" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Expiry</label>
                      <input placeholder="MM / YY" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a87c]" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">CVV</label>
                      <input placeholder="•••" maxLength={3} type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#c9a87c]" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Review */}
            {step === 2 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-5">
                <h2 className="font-serif-display text-2xl font-light text-gray-900">Review Your Order</h2>

                {/* Address */}
                <div className="bg-[#fdf8f0] rounded-2xl p-4 flex gap-3">
                  <MapPin size={18} className="text-[#c9a87c] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{form.name} · {form.phone}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{form.address}, {form.city}, {form.state} - {form.pincode}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.key} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.size} × {item.qty}</p>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">₹{(item.price*item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s-1)}
                  className="px-6 py-3.5 border border-gray-200 text-sm font-semibold text-gray-600 rounded-full hover:border-gray-400 transition-colors"
                >
                  ← Back
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={nextStep}
                  className="flex-1 py-3.5 bg-[#1a1a1a] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-gray-800 transition-all"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex-1 py-3.5 bg-[#c9a87c] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#b8966b] hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {placing ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Placing Order…</>
                  ) : "Place Order 🌸"}
                </button>
              )}
            </div>
          </div>

          {/* ── Order Summary Sidebar ──────────────── */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm h-fit sticky top-24">
            <h3 className="font-serif-display text-xl font-light text-gray-900 mb-4 pb-3 border-b border-gray-100">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {items.map(i => (
                <div key={i.key} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{i.name} ×{i.qty}</span>
                  <span className="font-medium flex-shrink-0">₹{(i.price*i.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
              </div>
              {promo.applied && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span><span>−₹{discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee===0?"text-emerald-600 font-semibold":""}>{deliveryFee===0?"FREE":`₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span className="font-serif-display text-lg font-light">Total</span>
                <span className="font-serif-display text-lg">₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 text-center text-[10px] text-gray-400">🔒 256-bit SSL Encrypted Checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


