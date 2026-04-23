import { Truck, User, Phone, Mail } from "lucide-react";
import CheckoutField from "./CheckoutField";
import AddressLookup from "./AddressLookup";

const ShippingSection = ({
  form,
  errors,
  onFieldChange,
  onAddressFocus,
  onAddressBlur,
  searchingAddress,
  fetchingLocation,
  locationError,
  manualSuggestions,
  onSuggestionSelect,
  onSearch,
  onUseCurrentLocation,
  onClearHistory,
}) => (
  <section className="bg-gradient-to-br from-white/80 via-white/60 to-[#fdf8f0]/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-white/70 shadow-2xl shadow-gray-300/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fdf8f0] to-[#f5e6d3] flex items-center justify-center text-[#c9a87c] shadow-md shadow-[#c9a87c]/10">
        <Truck size={20} />
      </div>
      <h2 className="text-2xl font-serif text-gray-900">Shipping Information</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CheckoutField
        name="name"
        label="Full Name"
        icon={User}
        placeholder="e.g. Abinash Rout"
        value={form.name}
        onChange={onFieldChange}
        error={errors.name}
      />
      <CheckoutField
        name="phone"
        label="Phone Number"
        icon={Phone}
        placeholder="9876543210"
        value={form.phone}
        onChange={onFieldChange}
        error={errors.phone}
      />
      <div className="md:col-span-2">
        <CheckoutField
          name="email"
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="avi@example.com"
          value={form.email}
          onChange={onFieldChange}
          error={errors.email}
        />
      </div>

      <AddressLookup
        value={form.address}
        onChange={onFieldChange}
        onFocus={onAddressFocus}
        onBlur={onAddressBlur}
        searchingAddress={searchingAddress}
        fetchingLocation={fetchingLocation}
        locationError={locationError}
        manualSuggestions={manualSuggestions}
        onSuggestionSelect={onSuggestionSelect}
        onSearch={onSearch}
        onUseCurrentLocation={onUseCurrentLocation}
        onClearHistory={onClearHistory}
      />

      <CheckoutField
        name="city"
        label="City"
        placeholder="Jajpur"
        value={form.city}
        onChange={onFieldChange}
        error={errors.city}
      />
      <CheckoutField
        name="pincode"
        label="Pincode"
        placeholder="755023"
        value={form.pincode}
        onChange={onFieldChange}
        error={errors.pincode}
      />
    </div>
  </section>
);

export default ShippingSection;
