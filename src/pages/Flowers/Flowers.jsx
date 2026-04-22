import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  FlowerIcon,
  SlidersHorizontal,
} from "lucide-react";
import {
  products,
  categories,
  getProductsByCategory,
} from "../../data/flowers";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";
import ProductCard from "./ProductCard";

const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
  { label: "Best Rated", value: "rating" },
];

const FlowersPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [showSort, setShowSort] = useState(false);

  /* ── Filter & sort logic ── */
  let filtered = getProductsByCategory(activeCategory);
  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.occasions.some((o) =>
          o.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  const currentSort = sortOptions.find((s) => s.value === sort);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="transition-colors hover:text-[#c9a87c]">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-gray-600">
            {searchQuery ? `Search: "${searchQuery}"` : "Fresh Flowers"}
          </span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <section className="relative mx-4 mb-10 overflow-hidden rounded-3xl md:mx-8 lg:mx-auto lg:max-w-7xl">
        <img
          src="https://images.unsplash.com/photo-1533907650686-70576141c030?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fresh Flowers"
          className="h-64 w-full object-cover md:h-80 lg:h-[420px]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#c9a87c] opacity-15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-56 w-56 rounded-full bg-rose-400 opacity-10 blur-2xl" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
          {/* Pill */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a87c]/40 bg-[#c9a87c]/15 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles size={11} className="text-[#c9a87c]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a87c]">
              Farm Fresh
            </span>
          </div>

          <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            {searchQuery ? (
              <>
                Results for{" "}
                <span className="italic text-[#c9a87c]">"{searchQuery}"</span>
              </>
            ) : (
              <>
                Fresh <span className="italic text-[#c9a87c]">Flowers</span>
              </>
            )}
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            Handpicked blooms from the finest farms — delivered fresh to your
            door, same day.
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { val: `${products.length}+`, label: "Varieties" },
              { val: "Same Day", label: "Delivery" },
              { val: "Farm", label: "Fresh" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-xl font-light text-[#c9a87c]">
                  {s.val}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="mx-auto max-w-7xl px-4 pb-20">
        {/* Filter + Sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200
                  ${
                    activeCategory === c
                      ? "bg-[#c9a87c] text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-[#c9a87c] hover:text-[#c9a87c]"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 shadow-sm transition-all hover:border-[#c9a87c]"
            >
              <SlidersHorizontal size={12} />
              {currentSort?.label}
              <ChevronRight
                size={12}
                className={`transition-transform duration-200 ${
                  showSort ? "rotate-90" : ""
                }`}
              />
            </button>

            {showSort && (
              <div className="absolute right-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSort(opt.value);
                      setShowSort(false);
                    }}
                    className={`block w-full border-b border-gray-50 px-4 py-2.5 text-left text-xs last:border-0 transition-colors hover:bg-[#fdf6ec] hover:text-[#c9a87c]
                      ${
                        sort === opt.value
                          ? "bg-[#fdf6ec] font-semibold text-[#c9a87c]"
                          : "text-gray-600"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-5 text-xs text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-700">{sorted.length}</span>{" "}
          results
          {activeCategory !== "All" && (
            <>
              in
              <span className="font-semibold text-[#c9a87c]">
                {activeCategory}
              </span>
            </>
          )}
        </p>

        {/* ── Product Grid or Empty state ── */}
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f1e8]">
              <FlowerIcon size={28} className="text-[#c9a87c]" />
            </div>
            <h3 className="font-serif text-2xl font-light text-gray-700">
              No flowers found
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Try a different category or search term
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 flex items-center gap-2 rounded-full bg-[#c9a87c] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#b8966b]"
            >
              View All Flowers
              <ArrowRight size={13} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <FlowerFooter />
    </div>
  );
};

export default FlowersPage;
