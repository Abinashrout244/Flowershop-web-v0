const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[#8b6b40]"
    >
      <span className="text-sm font-medium text-gray-800 md:text-base">{item.question}</span>
      <span className="text-xl font-light text-[#c9a87c]">{isOpen ? "-" : "+"}</span>
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
      </div>
    </div>
  </div>
);

export default FAQItem;


