import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

const sections = [
  {
    title: "Information We Collect",
    text: "We collect details you provide during checkout, account use, and support interactions, including contact and delivery information.",
  },
  {
    title: "How We Use Information",
    text: "Your information is used to process orders, personalize experience, provide support, and improve service reliability and communication.",
  },
  {
    title: "Data Security",
    text: "We use secure infrastructure and trusted payment gateways to protect personal data and transaction details.",
  },
  {
    title: "Your Choices",
    text: "You can request updates, corrections, or deletion of your data by contacting our support team.",
  },
];

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Privacy Policy</span>
      </div>
    </div>
    <main className="mx-auto max-w-4xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <h1 className="font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-600 md:text-base">
          Your trust matters to us. This page explains what data we collect and how we use and protect it.
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

export default PrivacyPolicyPage;
