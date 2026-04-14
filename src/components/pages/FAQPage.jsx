import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NavHeader from "../homepage/NavHeader";
import FlowerFooter from "../homepage/FlowerFooter";
import Sidebar from "../faq/Sidebar";
import FAQContent from "../faq/FAQContent";
import {
  FAQ_CATEGORIES,
  FAQ_DATA,
  DEFAULT_FAQ_CATEGORY,
} from "../../Data/faqData";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(DEFAULT_FAQ_CATEGORY);
  const [openIndex, setOpenIndex] = useState(0);

  const activeCategoryMeta = useMemo(
    () => FAQ_CATEGORIES.find((item) => item.id === activeCategory) || FAQ_CATEGORIES[0],
    [activeCategory]
  );

  const activeFaqs = FAQ_DATA[activeCategory] || [];

  const handleCategoryChange = (nextCategory) => {
    setActiveCategory(nextCategory);
    setOpenIndex(0);
  };

  const handleAccordionToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <NavHeader />

      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="transition-colors hover:text-[#c9a87c]">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-gray-600">FAQ</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c9a87c]">
            Help Center
          </p>
          <h2 className="font-serif-display text-3xl font-light text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-500 md:text-base">
            Find quick answers about ordering, payments, cancellations, and deliveries.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <Sidebar
            categories={FAQ_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onDropdownChange={(e) => handleCategoryChange(e.target.value)}
          />

          <FAQContent
            title={activeCategoryMeta.label}
            faqs={activeFaqs}
            openIndex={openIndex}
            onToggle={handleAccordionToggle}
          />
        </div>
      </main>

      <FlowerFooter />
    </div>
  );
};

export default FAQPage;
