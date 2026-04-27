import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, ShoppingBag, Heart, User, Store } from "lucide-react";
import { selectCartCount } from "../../../features/cart/cartSlice";
import { selectWishlistCount } from "../../../features/user/wishlistSlice";

const NAV_ITEMS = [
  { label: "Home",     href: "/",         icon: Home },
  { label: "Shop",     href: "/flowers",  icon: Store },
  { label: "Cart",     href: "/cart",     icon: ShoppingBag, badge: "cart" },
  { label: "Wishlist", href: "/wishlist", icon: Heart,        badge: "wishlist" },
  { label: "Profile",  href: "/profile",  icon: User },
];

/* ─── Flipkart-style mobile bottom navigation ─── */
const MobileBottomNav = () => {
  const location = useLocation();
  const cartCount     = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);

  const getCount = (badge) => {
    if (badge === "cart")     return cartCount;
    if (badge === "wishlist") return wishlistCount;
    return 0;
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(255,255,255,0.97)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.09)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ label, href, icon: Icon, badge }) => {
          const isActive =
            href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(href);
          const count = badge ? getCount(badge) : 0;

          return (
            <Link
              key={label}
              to={href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative group"
              style={{ minHeight: 56 }}
            >
              {/* Active indicator bar at top */}
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 28 : 0,
                  background: "#c9a87c",
                }}
              />

              {/* Icon wrapper */}
              <span className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  style={{
                    color: isActive ? "#c9a87c" : "#6b7280",
                    transition: "color 0.2s, transform 0.2s",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                />
                {/* Badge */}
                {count > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[16px] h-4 flex items-center justify-center text-white font-bold px-0.5 rounded-full"
                    style={{
                      fontSize: 9,
                      background:
                        badge === "wishlist" ? "#ef4444" : "#1a1a1a",
                      lineHeight: 1,
                    }}
                  >
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </span>

              {/* Label */}
              <span
                className="font-medium tracking-wide transition-colors duration-200"
                style={{
                  fontSize: 10,
                  color: isActive ? "#c9a87c" : "#9ca3af",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
