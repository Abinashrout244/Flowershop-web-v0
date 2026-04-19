const logos = [
  { name: "Vogue", style: "font-serif-display text-2xl font-bold tracking-tight" },
  { name: "GQ", style: "font-serif-display text-2xl font-bold tracking-widest" },
  { name: "AD", style: "font-serif-display text-2xl font-bold italic" },
  { name: "Verve", style: "font-serif-display text-xl font-light tracking-[0.2em] uppercase" },
  { name: "Forbes", style: "font-sans text-xl font-black tracking-tight" },
  { name: "Elle", style: "font-serif-display text-2xl font-light italic tracking-widest uppercase" },
  { name: "Femina", style: "font-sans text-base font-semibold tracking-[0.1em] uppercase" },
];

const AsSeenOn = () => (
  <section className="py-12 md:py-16 bg-white border-y border-gray-100">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-xs font-semibold tracking-[0.35em] text-gray-400 uppercase mb-8">
        As Seen On
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {logos.map((logo) => (
          <span
            key={logo.name}
            className={`${logo.style} text-gray-300 hover:text-gray-500 transition-colors duration-300 cursor-pointer select-none`}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default AsSeenOn;


