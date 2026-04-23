const CheckoutField = ({
  name,
  label,
  icon: Icon,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
}) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <Icon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c9a87c] transition-colors"
        />
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-white border rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#c9a87c]/5 focus:border-[#c9a87c] transition-all ${
          error ? "border-red-300 bg-red-50/30" : "border-gray-100 shadow-sm"
        }`}
      />
    </div>
    {error && (
      <p className="text-[10px] text-red-500 font-medium ml-1">{error}</p>
    )}
  </div>
);

export default CheckoutField;
