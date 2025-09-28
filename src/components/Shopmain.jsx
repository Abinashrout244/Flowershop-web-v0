import { Herosection } from "../Constants";
import bgimage from "/assets/images/shop-bg.jpg";
import { Section } from "./Section";
import { Outlet } from "react-router-dom";
import Products from "./Products";
import Shimmer from "./Shimmer";
const Shopmain = () => {
  return Products?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-[#DDE0EB]">
      <Herosection bgimage={bgimage} heightClass="h-[350px] md:h-[550px]" />
      <div className="px-3 md:px-[250px] py-[120px] flex flex-col gap-14">
        <div className="flex flex-col gap-[40px] text-center justify-center">
          <h1 className="text-4xl md:text-6xl text-[#2D416A] font-semibold font-head">
            Our Shop
          </h1>
        </div>
        <div className="flex flex-col gap-10">
          <Section ids={[0, 1, 2]} />
          <Section ids={[3, 4, 5]} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Shopmain;
