import image1 from "../assets/images/aboutflower-5.jpg";
import image2 from "../assets/images/aboutflower-6.jpg";
import image3 from "../assets/images/aboutflower-7.jpg";
import image4 from "../assets/images/aboutflower-8.jpg";
import image5 from "../assets/images/aboutflower-9.jpg";
import image6 from "../assets/images/aboutflower-10.jpg";
import image7 from "../assets/images/aboutflower-11.jpg";
import image8 from "../assets/images/aboutflower-12.jpg";
import image9 from "../assets/images/aboutflower-13.jpg";
import image10 from "../assets/images/aboutflower-14.jpg";
import image11 from "../assets/images/aboutflower-15.jpg";
import image12 from "../assets/images/aboutflower-16.jpg";

const Section = ({ images }) => {
  return (
    <div className="grid grid-cols-1 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 items-center">
        <div className="w-full h-full">
          <img
            src={images[0]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <img
            src={images[1]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
          <img
            src={images[2]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
          <img
            src={images[3]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
          <img
            src={images[4]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
        </div>

        <div className="w-full h-full">
          <img
            src={images[5]}
            className="w-full h-auto object-cover hover:opacity-75"
          />
        </div>
      </div>
    </div>
  );
};

const Aboutimage = () => {
  return (
    <div className="px-1">
      <h1 className="text-center font-semibold text-3xl md:text-5xl py-1 font-head md:py-5 text-[#2D416A] px-[30px] pb-2 md:px-[390px] md:leading-[50px]">
        We are proud to show you some of our recent work
      </h1>

      <div className="space-y-6">
        <Section images={[image1, image2, image3, image4, image5, image6]} />
        <Section images={[image7, image8, image9, image10, image11, image12]} />
      </div>
    </div>
  );
};

export default Aboutimage;
