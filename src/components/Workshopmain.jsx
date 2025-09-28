import { Herosection } from "../Constants";
import bgFlower from "../assets/images/workshopbg.jpg";
import { Info } from "../Data/Data";

const Workshopmain = () => {
  return (
    <div className="bg-[#DDE0EB]">
      <Herosection bgimage={bgFlower} heightClass="h-[350px] md:h-[650px]" />
      <div className="px-3 md:px-[300px] py-[120px] flex flex-col gap-14">
        <div className="flex flex-col gap-[40px] text-center justify-center">
          <h1 className="text-4xl md:text-6xl text-[#2D416A] font-semibold font-head ">
            Floral Arrangement Classes
          </h1>
          <p className="font-semibold text-[16px] md:text-lg text-slate-600 font-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
            elit nibh. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Info.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-start gap-2.5 p-[2px]  "
                >
                  <div className="overflow-hidden rounded-[2px] ">
                    <img
                      src={item?.img}
                      className="object-center h-full w-full md:h-[160px] md:w-[250px] hover:scale-115 hover:opacity-70 rounded-[2px] transition-all ease-in-out  "
                    />
                  </div>
                  <h1 className="md:text-xl text-[16px] font-semibold text-slate-600 font-syne ">
                    {item?.name}
                  </h1>
                  <p className="md:text-2xl text-xl font-bold text-[#2D416A] font-syne">
                    $30
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshopmain;
