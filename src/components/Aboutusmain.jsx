import { Herosection } from "../Constants";
import aboutbg from "/assets/images/aboutbg.jpg";
import AboutStory from "../components/Aboutourstory";
import AboutTeam from "../components/AboutTeam";
import AboutImage from "../components/Aboutimage";

const Aboutus = () => {
  return (
    <div className=" bg-[#DDE0EB]">
      <Herosection
        bgimage={aboutbg}
        title={"Learn more about Flower  Shop"}
        heightClass="h-[350px] md:h-[500px]"
      />
      <AboutStory />
      <AboutTeam />
      <AboutImage />
    </div>
  );
};

export default Aboutus;
