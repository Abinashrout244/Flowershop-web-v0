import FAQItem from "../FAQItem/FAQItem";

const FAQList = ({ title, faqs, openIndex, onToggle }) => (
  <section className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 md:p-7">
    <h1 className="font-serif-display text-3xl font-light text-gray-900 md:text-4xl">
      {title}
    </h1>

    <div className="mt-6 rounded-xl border border-gray-200 bg-white px-4 md:px-6">
      {faqs.map((item, index) => (
        <FAQItem
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => onToggle(index)}
        />
      ))}
    </div>
  </section>
);

export default FAQList;
