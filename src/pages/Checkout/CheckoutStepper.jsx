import { Check } from "lucide-react";

const CheckoutStepper = ({ steps, step }) => (
  <div className="max-w-xl mx-auto mb-16 relative">
    <div className="flex justify-between relative z-10">
      {steps.map((label, index) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              index <= step
                ? "bg-gradient-to-br from-white to-[#fdf8f0] border-[#c9a87c] shadow-lg shadow-[#c9a87c]/20 scale-110"
                : "bg-gradient-to-br from-gray-50 to-gray-100 border-transparent text-gray-300"
            }`}
          >
            {index < step ? (
              <Check size={18} className="text-[#c9a87c]" />
            ) : (
              <span
                className={`text-xs font-bold ${
                  index === step ? "text-[#c9a87c]" : ""
                }`}
              >
                {index + 1}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-widest mt-3 transition-colors ${
              index === step ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
    <div className="absolute top-5 left-0 w-full h-[2px] bg-gradient-to-r from-gray-200 via-gray-150 to-gray-100 -z-0" />
    <div
      className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-[#c9a87c] to-[#d4b896] transition-all duration-700 -z-0 shadow-lg shadow-[#c9a87c]/30"
      style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
    />
  </div>
);

export default CheckoutStepper;
