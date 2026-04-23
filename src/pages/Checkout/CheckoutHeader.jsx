import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutHeader = () => (
  <div className="mb-10 text-center">
    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">
      <Link to="/cart" className="hover:text-[#c9a87c] transition-colors">
        Bag
      </Link>
      <ChevronRight size={10} />
      <span className="text-gray-900 font-bold">Checkout</span>
    </div>
    <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 tracking-tight">
      Finalize Order
    </h1>
  </div>
);

export default CheckoutHeader;
