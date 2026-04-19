import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ChevronRight } from "lucide-react";
import { selectWishlist, removeFromWishlist } from "../../features/user/wishlistSlice";
import { addToCart } from "../../features/cart/cartSlice";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectWishlist);

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, key: `${item.id}_Default`, size: "Medium", qty: 1 }));
    dispatch(removeFromWishlist(item.id));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">Wishlist</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart size={24} className="text-[#c9a87c]" />
            <h1 className="font-serif-display text-3xl font-light text-gray-900">
              My Wishlist
            </h1>
          </div>
          {items.length > 0 && (
            <p className="text-sm text-gray-400">{items.length} {items.length === 1 ? "item" : "items"}</p>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-[#fdf8f0] flex items-center justify-center mx-auto mb-6">
              <Heart size={36} className="text-[#c9a87c]" />
            </div>
            <h2 className="font-serif-display text-2xl font-light text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-400 text-sm mb-8">Save flowers you love by clicking the heart icon.</p>
            <Link
              to="/flowers"
              className="inline-block px-10 py-4 bg-[#c9a87c] text-white font-bold text-sm tracking-widest uppercase rounded-full hover:bg-[#b8966b] hover:shadow-xl transition-all"
            >
              Browse Flowers
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="card-img w-full h-full object-cover"
                      />
                    </Link>
                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>
                    {/* Heart badge */}
                    <div className="absolute top-3 left-3">
                      <Heart size={16} className="fill-red-400 text-red-400 drop-shadow" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3.5">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-serif-display text-[15px] font-medium text-gray-800 hover:text-[#c9a87c] transition-colors mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      ₹{item.price?.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#c9a87c] text-white text-xs font-bold tracking-wide rounded-full hover:bg-[#b8966b] transition-colors"
                    >
                      <ShoppingBag size={13} /> Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/flowers"
                className="inline-block px-10 py-3.5 border border-[#1a1a1a] text-sm font-bold tracking-widest uppercase text-gray-800 rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
      <FlowerFooter />
    </div>
  );
};

export default WishlistPage;


