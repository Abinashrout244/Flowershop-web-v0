import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const clauses = [
  "All orders are subject to product availability and serviceability by pincode.",
  "Delivery timelines may vary due to weather, traffic, or unforeseen local restrictions.",
  "Personalized and perishable products are not eligible for standard returns.",
  "Users are responsible for sharing accurate recipient details for successful delivery.",
];

const TermsPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Terms & Conditions</span>
      </div>
    </div>
    <main className="mx-auto max-w-4xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Terms & Conditions</h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          By using Flora & Bloom, you agree to these terms that govern ordering, delivery, and use of our platform.
        </p>
      </section>
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <ul className="space-y-3">
          {clauses.map((item) => (
            <li key={item} className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600">{item}</li>
          ))}
        </ul>
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default TermsPage;


