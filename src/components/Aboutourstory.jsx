import aboutflower1 from "../assets/images/aboutflower-1.png";
import aboutflower2 from "../assets/images/aboutflower.jpg";

const Aboutourstory = () => {
  return (
    <div className="bg-[#DDE0EB] flex flex-col gap-[50px] px-6 md:px-12 lg:px-[180px] py-20 pt-[60px] md:pt-[110px]">
      <h1 className="text-center font-semibold text-4xl md:text-6xl py-1 md:py-5 text-[#2D416A] font-head">
        Our Story
      </h1>
      <div className=" flex flex-col md:flex-row items-center gap-[60px] ">
        <div className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left">
          <p className="text-slate-700 text-sm md:text-[17px] leading-relaxed max-w-xl mx-auto md:mx-0 font-syne">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            elit nibh. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Curabitur auctor velit non
            urna semper lacinia. .
          </p>
          <p className="text-slate-700 text-sm md:text-[17px] leading-relaxed max-w-xl mx-auto md:mx-0 font-syne">
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla
            ut pellentesque ante, vitae blandit dui. Sed gravida pretium erat.
          </p>
        </div>
        <div className="relative flex-1 flex justify-center">
          <img
            src={aboutflower1}
            alt="Flower Decoration"
            className="absolute left-4 md:left-[80px] -top-[20px] z-20 object-cover md:w-[442px] md:h-[295px] w-full h-full drop-shadow-lg"
          />

          <img
            src={aboutflower2}
            alt="Flower Pot"
            className="w-full h-full md:h-[295px] md:w-[460px] object-cover shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Aboutourstory;
