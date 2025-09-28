import Herosection from "./Herosection";
import Aboutusone from "./Aboutusone";
import Customerfav from "./Customerfav";
import Flowerbox from "./Flowerbox";
import Workshps from "./Workshps";
import Homeplants from "./Homeplants";
import Contactus from "./Contactus";

export const Body = () => {
  return (
    <div className="px-[20px] md:px-[100px] bg-[#DDE0EB]">
      <Herosection />
      <Aboutusone />
      <Customerfav />
      <Flowerbox />
      <Workshps />
      <Homeplants />
      <Contactus />
    </div>
  );
};

export default Body;
