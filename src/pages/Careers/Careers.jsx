import { Link } from "react-router-dom";
import { ChevronRight, Briefcase, HeartHandshake, Sparkles } from "lucide-react";
import NavHeader from "../../components/layout/Navbar/Navbar";
import FlowerFooter from "../../components/layout/Footer/Footer";

const roles = [
  "Senior Floral Designer",
  "Customer Experience Specialist",
  "City Operations Lead",
];

const CareersPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Careers</span>
      </div>
    </div>
    <main className="mx-auto max-w-7xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">Join Flora & Bloom</p>
        <h1 className="mt-2 font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Build A Beautiful Career</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
          We are building India&apos;s most loved premium floral brand. If you value design, empathy, and excellence, we would love to meet you.
        </p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <Briefcase size={18} className="text-[#c9a87c]" />
          <p className="mt-2 text-sm text-gray-700">Open Positions</p>
          <p className="text-2xl font-semibold text-gray-900">{roles.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <HeartHandshake size={18} className="text-[#c9a87c]" />
          <p className="mt-2 text-sm text-gray-700">People First Culture</p>
          <p className="text-sm text-gray-500">Collaborative, inclusive, growth focused</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <Sparkles size={18} className="text-[#c9a87c]" />
          <p className="mt-2 text-sm text-gray-700">Apply Now</p>
          <p className="text-sm text-gray-500">careers@florabloom.com</p>
        </div>
      </section>
      <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="font-serif-display text-2xl font-light text-gray-900">Current Opportunities</h2>
        <ul className="mt-4 space-y-2">
          {roles.map((role) => (
            <li key={role} className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700">{role}</li>
          ))}
        </ul>
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default CareersPage;


