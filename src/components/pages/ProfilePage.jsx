import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, MapPin, Settings, ChevronRight, LogOut, Star } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

const TABS = ["My Orders", "Addresses", "Settings"];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const orders = JSON.parse(localStorage.getItem("flora_orders") || "[]");

  const user = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    since: "Member since Jan 2024",
    avatar: "P",
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Page hero */}
      <div className="bg-gradient-to-r from-[#f8f3ec] to-[#fdf8f0] border-b border-[#ede3d4]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#c9a87c] flex items-center justify-center text-white text-3xl font-serif-display font-light shadow-lg">
              {user.avatar}
            </div>
            <div>
              <h1 className="font-serif-display text-3xl font-light text-gray-900">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
              <p className="text-[11px] text-[#c9a87c] font-semibold tracking-widest uppercase mt-1">{user.since}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Sidebar ──────────────────────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-fit lg:sticky lg:top-24">
            <div className="space-y-1">
              {TABS.map((tab, i) => {
                const icons = [Package, MapPin, Settings];
                const Icon = icons[i];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all
                      ${activeTab === i ? "bg-[#fdf8f0] text-[#c9a87c]" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <Icon size={16} />
                    {tab}
                    {activeTab === i && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                );
              })}

              <div className="border-t border-gray-100 mt-3 pt-3">
                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} /> Sign Out
                </Link>
              </div>
            </div>
          </div>

          {/* ── Main Content ─────────────────────── */}
          <div className="lg:col-span-3 space-y-4">

            {/* MY ORDERS */}
            {activeTab === 0 && (
              <div>
                <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-5">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <Package size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="font-serif-display text-xl font-light text-gray-500 mb-2">No orders yet</p>
                    <p className="text-gray-400 text-sm mb-5">Your order history will appear here after your first purchase.</p>
                    <Link to="/flowers" className="inline-block px-8 py-3 bg-[#c9a87c] text-white text-sm font-bold rounded-full hover:bg-[#b8966b] transition-colors">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-400 tracking-widest uppercase">Order</p>
                            <p className="font-bold text-gray-900 font-serif-display">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Placed on</p>
                            <p className="text-sm font-medium text-gray-700">{order.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="font-bold text-[#c9a87c]">₹{order.total?.toLocaleString()}</p>
                          </div>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-200">
                            {order.status}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="flex flex-wrap gap-3">
                          {order.items?.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-[#fdf8f0] rounded-xl px-3 py-2">
                              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-800 max-w-[120px] truncate">{item.name}</p>
                                <p className="text-[10px] text-gray-400">×{item.qty}</p>
                              </div>
                            </div>
                          ))}
                          {(order.items?.length || 0) > 3 && (
                            <div className="flex items-center justify-center bg-gray-50 rounded-xl px-4 py-2">
                              <p className="text-xs text-gray-500">+{order.items.length - 3} more</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-400">
                          <span className="flex items-center gap-1">
                            <Star size={10} className="fill-amber-400 text-amber-400" /> Rate this order
                          </span>
                          <span className="mx-2">·</span>
                          <span>Estimated: {order.estimatedDelivery}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === 1 && (
              <div>
                <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-5">Saved Addresses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border-2 border-[#c9a87c] shadow-sm p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold bg-[#c9a87c] text-white px-2.5 py-1 rounded-full tracking-widest uppercase">Home</span>
                      <button className="text-xs text-[#c9a87c] font-semibold hover:underline">Edit</button>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">12, Rose Garden Apartments, MG Road, Mumbai - 400001, Maharashtra</p>
                    <p className="text-xs text-gray-400 mt-1">{user.phone}</p>
                  </div>
                  <button className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#c9a87c] hover:text-[#c9a87c] transition-colors min-h-[140px]">
                    <MapPin size={24} />
                    <p className="text-sm font-semibold">Add New Address</p>
                  </button>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 2 && (
              <div>
                <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-5">Account Settings</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email Address", value: user.email },
                    { label: "Phone Number", value: user.phone },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{label}</label>
                      <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                        <span className="text-sm text-gray-800">{value}</span>
                        <button className="text-xs text-[#c9a87c] font-semibold hover:underline">Edit</button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Preferences</h3>
                    {[
                      "Email me about exclusive offers",
                      "SMS notifications for order updates",
                      "Birthday reminder flowers",
                    ].map(pref => (
                      <label key={pref} className="flex items-center justify-between py-2.5 border-b border-gray-50 cursor-pointer group">
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{pref}</span>
                        <div className="w-10 h-5 bg-[#c9a87c] rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                        </div>
                      </label>
                    ))}
                  </div>

                  <button className="w-full py-3.5 bg-[#c9a87c] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#b8966b] transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <FlowerFooter />
    </div>
  );
};

export default ProfilePage;
