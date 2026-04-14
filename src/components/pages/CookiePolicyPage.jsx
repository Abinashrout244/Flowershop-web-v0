import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

const cookieTypes = [
  { title: "Essential Cookies", text: "Required for core functionality like cart, login, and secure checkout." },
  { title: "Analytics Cookies", text: "Help us understand traffic, performance, and user behavior trends." },
  { title: "Preference Cookies", text: "Remember your settings for language, city, and browsing preferences." },
  { title: "Marketing Cookies", text: "Used to show relevant offers and campaign communication." },
];

const CookiePolicyPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Cookie Policy</span>
      </div>
    </div>
    <main className="mx-auto max-w-4xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Cookie Policy</h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          This policy explains how we use cookies to improve site performance, personalization, and security.
        </p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {cookieTypes.map((item) => (
          <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default CookiePolicyPage;
