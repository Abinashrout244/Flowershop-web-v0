import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const sections = [
  {
    title: "Eligibility",
    text: "Fresh flowers are perishable and generally non-returnable. If there is quality damage or wrong item delivery, contact support within the claim window with photos.",
  },
  {
    title: "Replacements",
    text: "Eligible issues are resolved with a replacement delivery or equivalent store credit depending on location, stock, and timing.",
  },
  {
    title: "Refund Timeline",
    text: "Approved refunds are initiated immediately and usually reflect within 5-7 business days depending on your payment provider.",
  },
];

const ReturnsPolicyPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Returns Policy</span>
      </div>
    </div>
    <main className="mx-auto max-w-4xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Returns Policy</h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          We are committed to premium quality and fair resolutions. This policy explains how returns, replacements, and refunds are handled.
        </p>
      </section>
      <section className="mt-6 space-y-4">
        {sections.map((item) => (
          <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default ReturnsPolicyPage;


