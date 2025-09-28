import { useSelector } from "react-redux";
import CartProducts from "./CartProducts";
import { Link } from "react-router-dom";

const Cart = () => {
  const CartItems = useSelector((store) => store?.cart?.items ?? []);

  const Total_price = CartItems.reduce((accumlator, product) => {
    const Price = parseFloat(product.price.replace("$", ""));
    return accumlator + Price;
  }, 0);

  return (
    <div className="pt-[140px] min-h-screen bg-[#DDE0EB] px-4 md:px-[250px]">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2D416A]">
          Shopping Cart
        </h1>
        <p className="text-md md:text-lg font-medium text-slate-400">
          Store / Shopping Cart
        </p>
      </div>

      {CartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 py-40 bg-[#DDE0EB] rounded-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-600 mb-4 text-center">
            Your Cart is Empty
          </h2>
          <p className="text-md text-slate-500 mb-6 text-center">
            Browse our store and add some flowers to your cart.
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#2D416A] text-white rounded-lg font-semibold hover:bg-[#1f3250] transition-colors"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="px-[200px]">
          <div className="flex flex-col gap-5 pb-4">
            {CartItems.map((Product, index) => (
              <CartProducts {...Product} key={Product?.id ?? index} />
            ))}
          </div>
          <div className="flex flex-row justify-between border-t-2 border-t-gray-500 py-2 px-[50px]">
            <h2 className="font-semibold text-2xl text-[#2D416A]">Total:</h2>
            <p className="font-semibold text-2xl text-[#2D416A]">
              ${Total_price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
