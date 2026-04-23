import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import {
  selectCartItems,
  selectCartSubtotal,
  selectPromo,
  clearCart,
} from "../../features/cart/cartSlice";
import NavHeader from "../../components/layout/Navbar/Navbar";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutStepper from "./CheckoutStepper";
import ShippingSection from "./ShippingSection";
import PaymentSection from "./PaymentSection";
import ReviewSection from "./ReviewSection";
import CheckoutSidebar from "./CheckoutSidebar";
import { DELIVERY_FEE, steps } from "./checkoutConstants";
import {
  extractNominatimAddress,
  formatDisplayAddress,
  loadAddressHistory,
  buildManualSuggestions,
} from "./checkoutHelpers";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const promo = useSelector(selectPromo);

  const discountAmt = promo.applied
    ? Math.round((subtotal * promo.discount) / 100)
    : 0;
  const deliveryFee = subtotal >= 999 ? 0 : DELIVERY_FEE;
  const total = subtotal - discountAmt + deliveryFee;

  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("upi");
  const [placing, setPlacing] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [addressHistory, setAddressHistory] = useState(loadAddressHistory);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const handleField = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
    if (e.target.name === "address") {
      setLocationError("");
    }
  };

  const saveAddressHistory = (entry) => {
    const normalizedAddress = entry.address?.trim();
    if (!normalizedAddress) return;

    setAddressHistory((current) => {
      const next = [
        { ...entry, address: normalizedAddress, ts: Date.now() },
        ...current.filter(
          (item) =>
            item.address?.trim().toLowerCase() !==
            normalizedAddress.toLowerCase(),
        ),
      ].slice(0, 6);

      localStorage.setItem("flora_address_history", JSON.stringify(next));
      return next;
    });
  };

  const applyAddressSuggestion = (suggestion) => {
    setForm((f) => ({
      ...f,
      address: suggestion.address || f.address,
      city: suggestion.city || f.city,
      state: suggestion.state || f.state,
      pincode: suggestion.pincode || f.pincode,
    }));
    setLocationError("");
    setAddressFocused(false);
  };

  const manualSuggestions = buildManualSuggestions(
    form.address,
    addressFocused,
    addressHistory,
  );

  const handleSearchAddress = async () => {
    setLocationError("");
    if (!form.address.trim()) {
      setLocationError("Type an address to search.");
      return;
    }

    try {
      setSearchingAddress(true);
      const baseUrl = import.meta.env.VITE_NOMINATIM_BASE_URL;
      if (!baseUrl) {
        setLocationError("Set VITE_NOMINATIM_BASE_URL first.");
        return;
      }

      const language = navigator.language || "en";
      const url = new URL("/search", baseUrl);
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("limit", "5");
      url.searchParams.set("countrycodes", "in");
      url.searchParams.set("accept-language", language);
      url.searchParams.set("q", form.address);

      const res = await fetch(url.toString());
      const results = await res.json();
      const best = Array.isArray(results) ? results[0] : null;

      if (!best) {
        setLocationError("No matching address found.");
        return;
      }

      const { city, state, pincode } = extractNominatimAddress(best.address);
      const displayAddress = formatDisplayAddress(best);
      setForm((f) => ({
        ...f,
        address: displayAddress || f.address,
        city: city || f.city,
        state: state || f.state,
        pincode: pincode || f.pincode,
      }));
      saveAddressHistory({
        address: displayAddress || form.address,
        city: city || "",
        state: state || "",
        pincode: pincode || "",
      });
      setAddressFocused(false);
    } catch (err) {
      setLocationError("Failed to search address.");
    } finally {
      setSearchingAddress(false);
    }
  };

  const handleUseCurrentLocation = () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      return;
    }

    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          setFetchingLocation(true);
          const baseUrl = import.meta.env.VITE_NOMINATIM_BASE_URL;
          if (!baseUrl) {
            setLocationError("Set VITE_NOMINATIM_BASE_URL first.");
            return;
          }

          const language = navigator.language || "en";
          const url = new URL("/reverse", baseUrl);
          url.searchParams.set("format", "jsonv2");
          url.searchParams.set("addressdetails", "1");
          url.searchParams.set("lat", String(coords.latitude));
          url.searchParams.set("lon", String(coords.longitude));
          url.searchParams.set("accept-language", language);

          const res = await fetch(url.toString());
          const data = await res.json();
          if (data?.display_name) {
            const { city, state, pincode } = extractNominatimAddress(
              data.address,
            );
            const displayAddress = formatDisplayAddress(data);
            setForm((f) => ({
              ...f,
              address: displayAddress,
              city: city || f.city,
              state: state || f.state,
              pincode: pincode || f.pincode,
            }));
            saveAddressHistory({
              address: displayAddress || form.address,
              city: city || "",
              state: state || "",
              pincode: pincode || "",
            });
            setAddressFocused(false);
          } else {
            setLocationError("No address found for your location.");
          }
        } catch (err) {
          setLocationError("Failed to fetch location.");
        } finally {
          setFetchingLocation(false);
        }
      },
      () => {
        setFetchingLocation(false);
        setLocationError("Permission denied or location unavailable.");
      },
    );
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = "Required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email";
      if (form.phone.length < 10) errs.phone = "Invalid phone";
      if (!form.address.trim()) errs.address = "Address required";
      if (form.pincode.length !== 6) errs.pincode = "6 digits";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const placeOrder = () => {
    setPlacing(true);
    const orderData = {
      id: `FL-${Math.random().toString(36).toUpperCase().substring(2, 9)}`,
      items,
      total,
      address: form,
      method: payMethod,
      date: new Date().toISOString(),
    };

    setTimeout(() => {
      const prev = JSON.parse(localStorage.getItem("flora_orders") || "[]");
      localStorage.setItem(
        "flora_orders",
        JSON.stringify([orderData, ...prev]),
      );
      dispatch(clearCart());
      navigate("/order-confirmed");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf9f7] via-[#fcfbf9] to-[#f5f3f0] text-gray-800 font-sans selection:bg-[#c9a87c]/20">
      <NavHeader />

      <main className="max-w-6xl mx-auto px-4 pt-8 pb-24">
        <CheckoutHeader />
        <CheckoutStepper steps={steps} step={step} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-7 flex h-full flex-col space-y-8">
            {step === 0 && (
              <ShippingSection
                form={form}
                errors={errors}
                onFieldChange={handleField}
                onAddressFocus={() => setAddressFocused(true)}
                onAddressBlur={() => {
                  window.setTimeout(() => setAddressFocused(false), 150);
                }}
                searchingAddress={searchingAddress}
                fetchingLocation={fetchingLocation}
                locationError={locationError}
                manualSuggestions={manualSuggestions}
                onSuggestionSelect={applyAddressSuggestion}
                onSearch={handleSearchAddress}
                onUseCurrentLocation={handleUseCurrentLocation}
                onClearHistory={() => {
                  setAddressHistory([]);
                  localStorage.removeItem("flora_address_history");
                }}
              />
            )}

            {step === 1 && (
              <PaymentSection
                payMethod={payMethod}
                onSelect={setPayMethod}
              />
            )}

            {step === 2 && (
              <ReviewSection
                form={form}
                payMethod={payMethod}
                onEditShipping={() => setStep(0)}
                onEditPayment={() => setStep(1)}
              />
            )}

            <div className="flex items-center gap-4 pt-4">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 hover:bg-gray-50/50 transition-all duration-300"
                >
                  Back
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={nextStep}
                  disabled={searchingAddress || fetchingLocation}
                  className="relative flex-1 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-900/30 hover:shadow-gray-900/50 hover:from-gray-800 hover:to-gray-700 transition-all hover:-translate-y-0.5 active:translate-y-0 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">
                    Continue to {steps[step + 1]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="relative flex-1 bg-gradient-to-r from-[#c9a87c] to-[#b8966b] text-white py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#c9a87c]/40 hover:shadow-[#c9a87c]/60 hover:from-[#b8966b] hover:to-[#a0845f] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {placing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin" />
                        Finalizing Order...
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        Confirm & Pay Now
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>

          <CheckoutSidebar
            items={items}
            subtotal={subtotal}
            promo={promo}
            discountAmt={discountAmt}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
