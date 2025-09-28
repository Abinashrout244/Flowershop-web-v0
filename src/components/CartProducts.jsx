import { useDispatch } from "react-redux";
import Products from "./Products";
import { removeItem } from "../utils/CartSlice";
import { TrashIcon } from "lucide-react";
const CartProducts = ({ id, name, price, img }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(removeItem(id));
  };
  return (
    <div className="flex flex-row gap-6 items-center justify-around w-full   md:max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow  ">
      <div className="flex-shrink-0 w-12 h-12 md:w-24 md:h-24 overflow-hidden rounded-md ">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover rounded-md hover:scale-110 transition-all hover:opacity-85"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1">
        <h2 className=" text-sm md:text-lg font-semibold truncate">{name}</h2>
        <p className="text-gray-600 font-medium">{price}</p>
      </div>

      <div>
        <button
          className="p-2 bg-[#2D416A] rounded-full hover:bg-red-600 hover:text-white transition-colors"
          onClick={() => handleRemoveItem()}
        >
          <TrashIcon className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default CartProducts;
