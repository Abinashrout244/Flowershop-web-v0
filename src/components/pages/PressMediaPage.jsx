import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, Camera, Mic } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";

const PressMediaPage = () => (
  <div className="min-h-screen bg-[#faf9f7]">
    <NavHeader />
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link to="/" className="hover:text-[#c9a87c]">Home</Link>
        <ChevronRight size={12} />
        <span className="font-medium text-gray-600">Press & Media</span>
      </div>
    </div>
    <main className="mx-auto max-w-7xl px-4 pb-16">
      <section className="rounded-2xl border border-gray-200 bg-white p-7 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">Media Center</p>
        <h1 className="mt-2 font-serif-display text-4xl font-light text-gray-900 md:text-5xl">Press & Media</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
          Access brand updates, press resources, and media contacts for Flora & Bloom.
        </p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-white p-5">
          <Newspaper size={18} className="text-[#c9a87c]" />
          <h2 className="mt-3 text-lg font-semibold text-gray-800">Latest News</h2>
          <p className="mt-1 text-sm text-gray-500">Company announcements and milestones.</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5">
          <Camera size={18} className="text-[#c9a87c]" />
          <h2 className="mt-3 text-lg font-semibold text-gray-800">Brand Assets</h2>
          <p className="mt-1 text-sm text-gray-500">Logos, brand guidelines, and imagery.</p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-5">
          <Mic size={18} className="text-[#c9a87c]" />
          <h2 className="mt-3 text-lg font-semibold text-gray-800">Media Contact</h2>
          <p className="mt-1 text-sm text-gray-500">press@florabloom.com</p>
        </article>
      </section>
    </main>
    <FlowerFooter />
  </div>
);

export default PressMediaPage;
