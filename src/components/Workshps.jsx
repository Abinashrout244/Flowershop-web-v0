import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Data } from "../Data/Data";

const Workshps = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="flex flex-col gap-10 px-6 pt-10 pb-12 max-w-7xl mx-auto mt-16">
      <h2 className="md:text-[55px] text-[40px] font-semibold text-[#2D416A] font-head">
        Upcoming Workshops:
      </h2>

      <div className="overflow-visible  ">
        <Slider {...settings} className="pb-8">
          {Data.map((item, index) => (
            <div key={index} className="px-2 flex flex-col items-center ">
              <div className="w-full  h-60 md:h-[180px] border border-slate-700 overflow-hidden rounded-lg">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-cover h-full w-full  hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <p className="mt-2 text-center text-sm text-wrap md:text-xl  font-medium text-slate-700 font-paragraph">
                {item.name}
              </p>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="/workshop">
          <button className="py-3 px-8 md:text-2xl text-lg font-medium text-white bg-[#2D416A] hover:bg-white hover:text-[#2D416A] transition-colors rounded">
            Explore Workshops
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Workshps;
