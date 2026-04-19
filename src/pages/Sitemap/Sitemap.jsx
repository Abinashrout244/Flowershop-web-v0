import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const sections = [
  { title: "Shop", links: [{ label: "Shop", to: "/shop" }, { label: "Flowers", to: "/flowers" }, { label: "Plants", to: "/plants" }, { label: "Gifts", to: "/gifts" }, { label: "Weddings", to: "/weddings" }] },
  { title: "Customer", links: [{ label: "Cart", to: "/cart" }, { label: "Wishlist", to: "/wishlist" }, { label: "Profile", to: "/profile" }, { label: "FAQ", to: "/faq" }, { label: "Contact Us", to: "/contact" }] },
  { title: "Company", links: [{ label: "About Us", to: "/about" }, { label: "Blog", to: "/blog" }, { label: "Careers", to: "/careers" }, { label: "Press & Media", to: "/press-media" }] },
  { title: "Legal", links: [{ label: "Terms & Conditions", to: "/terms-conditions" }, { label: "Cookie Policy", to: "/cookie-policy" }, { label: "Privacy Policy", to: "/privacy-policy" }, { label: "Returns Policy", to: "/returns-policy" }] },
];

const SitemapPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Sitemap</span>
      </div>
    </div>
    <main className="mx-auto max-w-7xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Sitemap</h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">Quickly navigate all major sections of Flora & Bloom.</p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((group) => (
          <article key={group.title} className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c9a87c]">{group.title}</h2>
            <ul className="mt-3 space-y-2">
              {group.links.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-gray-600 hover:text-[#c9a87c] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default SitemapPage;


