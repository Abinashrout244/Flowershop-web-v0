import flowereighteen from "../assets/images/flower-18.png";
import flowernineteen from "../assets/images/flower-19.png";
import floweretwenty from "../assets/images/flower-20.png";
import flowertwentyone from "../assets/images/flower-21.png";
import { Link } from "react-router-dom";

const Section = ({ image, name, description }) => {
  return (
    <div className="relative group items-center justify-center overflow-hidden cursor-pointer h-[450px]  flex-1">
      <div>
        <img
          src={image}
          className="object-cover h-full w-full md:h-[450px]  group-hover:opacity-95 group-hover:blur-sm group-hover:rotate-3 group-hover:scale-125 transition-transform"
        />
      </div>
      <div className="flex flex-col gap-5  absolute inset-0 items-center justify-center px-9 text-center translate-y-[60%] md:translate-y-[68%] group-hover:translate-y-5 transition-all">
        <h2 className="md:text-[25px] text-2xl font-semibold text-center text-white font-head">
          {name}
        </h2>
        <p className="md:text-xl text-lg text-white font-syne">{description}</p>
        <Link to="/shop">
          <button className="p-3 hover:bg-white hover:text-[#2D416A] bg-[#2D416A] rounded-md bg-[#2D416A]text-lg font-semibold text-white">
            Veiw More
          </button>
        </Link>
      </div>
    </div>
  );
};

const Homeplants = () => {
  return (
    <div className="flex flex-col md:flex-row pt-10 mt-16 pb-12 max-w-full justify-center items-center">
      <div className="flex flex-col md:flex-row h-full">
        <Section
          image={flowereighteen}
          name={" Home Plants"}
          description={
            " Be the first to know about exclusive discounts, and news discounts, workshops."
          }
        />
        <Section
          image={flowernineteen}
          name={" Weddings"}
          description={
            "  e the first to know about exclusive discounts, and news discounts, workshops."
          }
        />
        <Section
          image={floweretwenty}
          name={"  Custom Bouquets"}
          description={
            "   Be the first to know about exclusive discounts, and news discounts, workshops."
          }
        />
        <Section
          image={flowertwentyone}
          name={" Decoration Event"}
          description={
            "Be the first to know about exclusive discounts, i am the ownwer and ."
          }
        />
      </div>
    </div>
  );
};

export default Homeplants;
