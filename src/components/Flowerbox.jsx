import flowernine_ from "../assets/images/flower-9.png";
import flowerten from "../assets/images/flower-10.jpg";
import { Link } from "react-router-dom";

const Flowerbox = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-8 px-6 pt-10 pb-12 max-w-7xl mt-16 mx-auto lg:px-8">
      <div className="flex flex-col gap-4  md:gap-2 flex-1">
        <p className="text-2xl font-medium text-[#2D416A] font-paragraph ">
          This month in our workshop:
        </p>
        <h2 className="text-[55px] font-semibold text-[#2D416A] font-head">
          Flower box
        </h2>
        <p className="text-[16px] font-syne">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
          elit nibh. CNclassName aptent taciti sociosqu ad litora torquent.
        </p>
        <h1 className="text-3xl font-bold text-[#2D416A]">
          January 20th, 06:00 pm
        </h1>
        <Link to="/shop">
          <button className="w-fit bg-[#2D416A] pt-3 py-3 px-8 text-xl text-white hover:bg-white hover:text-[#2D416A] duration-500">
            Book for $30
          </button>
        </Link>
      </div>
      <div className="flex-1 flex flex-row relative">
        <img
          src={flowernine_}
          className="absolute -right-3 -top-4 md:-right-10 md:-top-7 z-10 object-cover h-full w-full"
        />
        <img src={flowerten} className="object-cover h-full w-full" />
      </div>
    </div>
  );
};

export default Flowerbox;
