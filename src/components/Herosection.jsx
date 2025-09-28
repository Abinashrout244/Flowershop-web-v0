import flowertwo from "../assets/images/flower-2.png";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-10 pt-[120px] max-w-full mx-auto lg:px-8 bg-[#DDE0EB]">
      {/* Text Section */}
      <div className="flex flex-col gap-6 flex-1 md:pl-[195px] md:pt-28">
        <h2 className="text-[45px] md:text-[75px] text-[#2D416A] font-semibold font-head">
          Send love with Flower Shop
        </h2>
        <p className="text-lg md:text-xl text-[#4B4B4B] font-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at
          elit nibh. Class aptent taciti sociosqu.
        </p>

        <Link to="/workshop">
          <button className="bg-[#2D416A] text-xl text-white py-3 px-8 w-fit hover:bg-white hover:text-[#2D416A] hover:font-semibold transition duration-500">
            Explore our offer
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src={flowertwo}
          alt="Flower"
          className="object-cover w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl"
        />
      </div>
    </div>
  );
};

export default Herosection;
