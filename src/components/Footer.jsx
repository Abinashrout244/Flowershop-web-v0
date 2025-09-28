import flowerone from "../assets/images/flower1.png";
import { Link } from "react-router-dom";

const Foooter = () => {
  return (
    <footer className=" max-w-full bg-[#DDE0EB]">
      <div className="flex flex-col gap-9 justify-center items-center md:px-60 pt-10 mb-24  ">
        <div className="flex flex-col gap-9 justify-center items-center">
          <h2 className="font-semibold text-3xl md:text-[40px] lg:text-[55px] text-[#2D416A] font-paragraph">
            Do you like our work?
          </h2>
          <Link to="/shop">
            <button className="items-center  hover:bg-white hover:text-[#2D416A] bg-[#2D416A] text-white font-semibold lg:px-20 lg:py-5 px-16 py-3 lg:text-xl">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-[#2D416A]">
        <div className="text-white p-10 grid-cols-1 grid md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-8 font-semibold">
            <div>
              <a href="#">
                <img src={flowerone} alt="Flower logo" className="h-14" />
              </a>
            </div>
            <div className="flex flex-row gap-5 items-center ml-10">
              <span className="bi bi-facebook text-4xl mr-3"></span>
              <span className="bi bi-github text-4xl mr-3"></span>
              <span className="bi bi-linkedin text-4xl"></span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl">
              <span className="bi bi-clock text-2xl mr-2"></span>Opening Hours
            </h2>
            <p>
              Monday: <span className="ml-3"> 8:45am – 7:30pm</span>
              <span className="ml-5">Open on all Bank Holidays</span>
            </p>

            <p>
              Tue to Sat: <span className="ml-3"> 8:45am – 7:30pm</span>
              <span className="ml-5">except during Christmas and</span>
            </p>

            <p>
              Sunday: <span className="ml-3">11am – 6:30pm</span>
              <span className="ml-5">Easter.</span>
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <p>
              <span className="bi bi-globe-central-south-asia text-2xl mr-2"></span>
              1st Ave, New York, NY 108
            </p>
            <p>
              <span className="bi bi-telephone-fill text-2xl mr-2"></span>
              +91 8018292928
            </p>
            <p>
              <span className="bi bi-envelope-fill text-2xl mr-2"></span>
              flowershop@example.com
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 text-white">
          <p>&copy;2023 Flower Shop All rights reserved</p>
          <a href="#">Privacy Policy - Legal Notice</a>
        </div>
      </div>
    </footer>
  );
};

export default Foooter;
