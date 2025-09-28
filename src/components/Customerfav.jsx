import flowersix from "/assets/images/flower-6.jpg";
import flowerseven from "/assets/images/flower-7.jpg";
import flowernine from "/assets/images/flower-9.jpg";
import { Link } from "react-router-dom";

const Section = ({ image, name }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <img
          src={image}
          className="object-cover h-full w-full md:w-[800px] md:h[900px]"
        />
        <p className="bg-[#2D416A] py-4 px-8 wifit text-lg text-white font-semibold absolute top-0 right-0">
          $80
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-[22px] text-[#2D416A]font-syne ">{name}</p>
        <Link to="/shop">
          <button className="text-[20px] font-paragraph text-[#2D416A] font-medium py-2 hover:border-2 hover:border-[#2D416A] hover:px-7 hover:translate-x-1.5 hover:rounded-lg">
            BUY NOW → <span className="bi bi-arrow-right"></span>
          </button>
        </Link>
      </div>
    </div>
  );
};
const Customerfav = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 pt-10 pb-12 max-w-7xl mt-16 mx-auto lg:px-8">
      <div className="flex flex-col gap-7">
        <h2 className="text-[55px] font-semibold text-[#2D416A] text-center font-head">
          Customers’ favorites
        </h2>
        <div className="flex flex-col md:flex-row gap-10 h-fit">
          <Section image={flowersix} name={"Summer Bouquet"} />
          <Section image={flowerseven} name={"Soft Pasteles Bouquet"} />
          <Section image={flowernine} name={"Spring Bouquet"} />
        </div>

        <div className="flex justify-center items-center">
          <Link to="/workshop">
            <button className="mt-10 border-2 border-[#2D416A] w-fit text-[#2D416A] hover:bg-[#2D416A] px-16 py-4 text-lg hover:text-white hover:font-medium">
              Explore our offer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Customerfav;
