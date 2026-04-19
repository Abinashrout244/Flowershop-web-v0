import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";
import {
  selectCartItems, selectCartSubtotal, selectPromo,
  removeFromCart, updateQty, applyPromo,
} from "../../features/cart/cartSlice";
import { addToCart } from "../../features/cart/cartSlice";
import { selectWishlist, removeFromWishlist } from "../../features/user/wishlistSlice";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const DELIVERY_FEE = 99;

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const promo = useSelector(selectPromo);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  const discountAmt = promo.applied ? Math.round(subtotal * promo.discount / 100) : 0;
  const deliveryFee = subtotal >= 999 ? 0 : DELIVERY_FEE;
  const total = subtotal - discountAmt + deliveryFee;

  const handleApplyPromo = () => {
    dispatch(applyPromo(promoInput));
    if (!["BLOOM20","FLORA10","FRESH15"].includes(promoInput.toUpperCase())) {
      setPromoError("Invalid promo code. Try BLOOM20");
    } else {
      setPromoError("");
    }
  };

  /* ── Empty cart ─────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf9f7]">
        <NavHeader />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="w-24 h-24 rounded-full bg-[#fdf8f0] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-[#c9a87c]" />
          </div>
          <h2 className="font-serif-display text-3xl font-light text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-8">Looks like you haven't added any flowers yet.</p>
          <Link
            to="/flowers"
            className="inline-block px-10 py-4 bg-[#c9a87c] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#b8966b] hover:shadow-xl transition-all duration-300"
          >
            Browse Flowers
          </Link>
        </div>
        <FlowerFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h1 className="font-serif-display text-3xl md:text-4xl font-light text-gray-900 mb-8">
          Your Cart <span className="text-lg text-gray-400 font-sans ml-2">({items.length} {items.length === 1 ? "item" : "items"})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.key} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                {/* Image */}
                <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-serif-display text-base md:text-lg font-medium text-gray-900 hover:text-[#c9a87c] transition-colors">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-[#c9a87c] font-semibold tracking-wide mt-0.5">Size: {item.size}</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.key))}
                      className="text-gray-300 hover:text-red-400 transition-colors p-1 flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty stepper */}
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => dispatch(updateQty({ key: item.key, qty: item.qty - 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => dispatch(updateQty({ key: item.key, qty: item.qty + 1 }))}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-serif-display text-lg font-light text-gray-900">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                      {item.qty > 1 && (
                        <p className="text-[11px] text-gray-400">₹{item.price.toLocaleString()} each</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              to="/flowers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a87c] hover:underline mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ────────────────────────── */}
          <div className="space-y-4">
            {/* Promo code */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Tag size={14} className="text-[#c9a87c]" /> Promo Code
              </p>
              <div className="flex gap-2">
                <input
                  value={promoInput}
                  onChange={e => { setPromoInput(e.target.value); setPromoError(""); }}
                  placeholder="Enter code"
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-[#c9a87c] uppercase tracking-widest"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2.5 bg-[#1a1a1a] text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-400 mt-2">{promoError}</p>}
              {promo.applied && (
                <p className="text-xs text-emerald-600 font-semibold mt-2">
                  🎉 {promo.discount}% discount applied!
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-2">Try: BLOOM20 · FLORA10 · FRESH15</p>
            </div>

            {/* Price breakdown */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-serif-display text-xl font-light text-gray-900 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((s,i)=>s+i.qty,0)} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                {promo.applied && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Promo ({promo.code})</span>
                    <span className="font-semibold">−₹{discountAmt.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-semibold" : "font-medium"}>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {subtotal < 999 && (
                  <p className="text-[10px] text-gray-400">Add ₹{999 - subtotal} more for free delivery</p>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100">
                  <span className="font-serif-display text-xl font-light">Total</span>
                  <span className="font-serif-display text-xl">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-5 py-4 bg-[#c9a87c] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#b8966b] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-gray-400">
                <span>🔒 Secure Checkout</span>
                <span>🌸 100% Fresh</span>
                <span>🚀 Same Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlowerFooter />
    </div>
  );
};

export default CartPage;


