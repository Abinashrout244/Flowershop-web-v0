import flowerfive from "/assets/images/floewr-5.jpg";
import flowerthree from "/assets/images/flower-3.png";
const Aboutusone = () => {
  return (
    <div className="bg-[#DDE0EB] flex flex-col md:flex-row items-center gap-12 px-6 md:px-12 lg:px-20 py-20 pt-[120px]">
      <div className="relative flex-1 flex justify-center">
        <img
          src={flowerthree}
          alt="Flower Decoration"
          className="absolute -left-6 md:-left-6 -top-8 z-10 object-cover md:w-[439px] md:h-[658px] w-full h-full drop-shadow-lg"
        />
        <img
          src={flowerfive}
          alt="Flower Pot"
          className=" w-full h-full md:h-[658px] md:w-[439px] object-cover  shadow-xl"
        />
      </div>

      <div className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-[#2D416A] leading-tight font-head ">
          About Flower Shop
        </h2>
        <p className="text-slate-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-syne">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
          elit nibh. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </p>
        <p className="text-slate-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 font-syne">
          Curabitur auctor velit non urna semper lacinia. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nulla ut pellentesque ante,
          vitae blandit dui.
        </p>
      </div>
    </div>
  );
};

export default Aboutusone;
