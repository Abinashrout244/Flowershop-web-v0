import { Link } from "react-router-dom";
import { ChevronRight, Gem, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const values = [
  {
    icon: Gem,
    title: "Luxury Craftsmanship",
    text: "Every arrangement is designed by expert florists with premium blooms, couture wrapping, and elegant finishing touches.",
  },
  {
    icon: Leaf,
    title: "Farm-Fresh Sourcing",
    text: "We source directly from trusted growers so every stem reaches your doorstep vibrant, fragrant, and long-lasting.",
  },
  {
    icon: HeartHandshake,
    title: "Thoughtful Service",
    text: "From handwritten notes to delivery updates, we make every gift feel deeply personal and perfectly timed.",
  },
];

const AboutPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />

    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="transition-colors hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">About Us</span>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 pb-16">
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-7 md:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a87c]">
              Since 1924
            </p>
            <h1 className="font-serif-display text-4xl font-light leading-tight text-gray-900 md:text-5xl">
              A Legacy Of Floral Luxury
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
              Flora & Bloom began with one simple belief: flowers should never feel ordinary.
              For over a century, we have transformed meaningful moments into unforgettable memories
              through refined design, fresh blooms, and exceptional service.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
              Whether it is a quiet apology or a grand celebration, our collections are curated to
              express emotion with grace and sophistication.
            </p>
          </div>
          <div className="relative min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1400&q=85&auto=format"
              alt="Luxury flowers"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {values.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f1e7] text-[#c9a87c]">
                <Icon size={18} />
              </div>
              <h2 className="font-serif-display text-2xl font-light text-gray-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <div className="flex items-center gap-2 text-[#c9a87c]">
          <Sparkles size={16} />
          <p className="text-xs font-semibold uppercase tracking-[0.25em]">Our Promise</p>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
          We blend timeless floral artistry with modern convenience so every order feels premium
          from checkout to delivery. With curated collections, transparent updates, and detail-driven
          presentation, we ensure your gift arrives exactly as beautifully as intended.
        </p>
      </section>
    </main>

    <FlowerFooter />
  </div>
);

export default AboutPage;


