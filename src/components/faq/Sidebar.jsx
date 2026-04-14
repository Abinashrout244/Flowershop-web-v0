const Sidebar = ({
  categories,
  activeCategory,
  onCategoryChange,
  onDropdownChange,
}) => (
  <aside className="w-full lg:w-[250px] lg:flex-shrink-0">
    <div className="rounded-2xl border border-gray-200 bg-white p-3">
      <div className="mb-3 lg:hidden">
        <label htmlFor="faq-category" className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          FAQ Categories
        </label>
        <select
          id="faq-category"
          value={activeCategory}
          onChange={onDropdownChange}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-[#c9a87c] focus:outline-none"
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="hidden lg:flex lg:flex-col lg:gap-1">
        {categories.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => onCategoryChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-[#f7f2e9] font-semibold text-[#8b6b40]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} className={isActive ? "text-[#c9a87c]" : "text-gray-400"} />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 rounded-xl bg-[#faf8f4] p-4">
        <p className="text-sm font-medium text-gray-700">Didn&apos;t find your answer?</p>
        <p className="mt-1 text-xs text-gray-500">
          Our team is here to help with any order, delivery, or payment query.
        </p>
        <button className="mt-3 w-full rounded-full bg-[#1a1a1a] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#c9a87c]">
          Contact Customer Service
        </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
