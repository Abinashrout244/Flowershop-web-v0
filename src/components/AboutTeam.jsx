import profile1 from "../assets/images/aboutflower-2.jpg";
import profile2 from "../assets/images/aboutflower-3.jpg";
import profile3 from "../assets/images/aboutflower-4.jpg";
import profile4 from "../assets/images/profile.jpg";

const Section = ({ Image, name, work }) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 items-center">
      <img
        src={Image}
        className="md:h-[200px] md:w-[200px] h-[160px] w-[160px] rounded-full"
      ></img>
      <h1 className="font-bold text-lg text-[#2D416A] font-paragraph">
        {name}
      </h1>
      <p className="text-slate-400 font-semibold font-syne">{work}</p>
    </div>
  );
};

const AboutTeam = () => {
  return (
    <div className=" flex flex-col gap-[50px] px-6 md:px-12 lg:px-[180px] py-20 pt-[60px] md:pt-[110px]">
      <h1 className="text-center font-semibold text-4xl md:text-6xl py-1 md:py-5 text-[#2D416A] font-head">
        Meet our Team
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <Section Image={profile1} name={"Mi SHADOW"} work={"Owner"} />
        <Section
          Image={profile2}
          name={"Anna Lukas"}
          work={"Floral Designer"}
        />
        <Section Image={profile3} name={"Mery Rose"} work={"Floral Designer"} />
        <Section
          Image={profile4}
          name={"elena Adams"}
          work={"Floral Designer"}
        />
      </div>
    </div>
  );
};

export default AboutTeam;
