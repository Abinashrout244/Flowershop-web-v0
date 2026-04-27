import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ChevronRight,
  Leaf,
  Sparkles,
  ArrowRight,
  Droplets,
  Sun,
} from "lucide-react";

import { products } from "../../data/flowers";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";
import PlantCard from "./PlantCard";

const plants = products.filter((p) => p.category === "Plants");

/* ── Page ── */
const PlantsPage = () => {
  const navigate = useNavigate();
return(
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    {/* Breadcrumb */}
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Plants</span>
      </div>
    </div>

    {/* ── Hero Banner ── */}
    <section className="relative mx-4 mb-10 overflow-hidden rounded-3xl md:mx-8 lg:mx-auto lg:max-w-7xl">
      <img
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&q=80&auto=format"
        alt="Plants"
        className="h-64 w-full object-cover md:h-80 lg:h-[420px]"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400 opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/3 h-56 w-56 rounded-full bg-teal-400 opacity-10 blur-2xl" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-14">
        {/* Label pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-1.5 backdrop-blur-sm">
          <Leaf size={11} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            Nature Indoors
          </span>
        </div>

        <h1 className="font-serif text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
          Potted <span className="italic text-emerald-400">Plants</span>
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
          Bring nature indoors with our curated collection of lush, healthy
          plants — perfect for every space and lifestyle.
        </p>

        {/* Stats row */}
        <div className="mt-6 flex flex-wrap gap-6">
          {[
            { val: `${plants.length}+`, label: "Plant Varieties" },
            { val: "Expert", label: "Care Guidance" },
            { val: "Free", label: "Pot Included" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-xl font-light text-emerald-400">
                {s.val}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => navigate("/shop")} className="mt-7 flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-gray-900 shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:text-white">
          Shop Now
          <ArrowRight size={13} />
        </button>
      </div>
    </section>

    {/* ── Feature Pills ── */}
    <div className="mx-auto mb-8 max-w-7xl px-4">
      <div className="flex flex-wrap gap-3">
        {[
          {
            icon: Leaf,
            label: "Air Purifying",
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            icon: Droplets,
            label: "Low Maintenance",
            color: "text-blue-600 bg-blue-50",
          },
          {
            icon: Sun,
            label: "Indoor Friendly",
            color: "text-amber-600 bg-amber-50",
          },
          {
            icon: Sparkles,
            label: "Premium Quality",
            color: "text-violet-600 bg-violet-50",
          },
        ].map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.label}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${f.color}`}
            >
              <Icon size={12} />
              {f.label}
            </div>
          );
        })}
      </div>
    </div>

    {/* ── Products ── */}
    <main className="mx-auto max-w-7xl px-4 pb-20">
      {/* Section header */}
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Our Collection
          </p>
          <h2 className="font-serif text-2xl font-light text-gray-900 md:text-3xl">
            Curated Plant Sets
          </h2>
        </div>
        <p className="hidden text-xs text-gray-400 sm:block">
          {plants.length} plants
        </p>
      </div>

      {/* Grid */}
      {plants.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {plants.map((p) => (
            <PlantCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Leaf size={28} className="text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No plants found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Check back soon for our curated collection.
          </p>
        </div>
      )}
    </main>

    <FlowerFooter />
  </div>
)};

export default PlantsPage;
