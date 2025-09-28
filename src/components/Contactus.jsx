import { useState } from "react";
import flowerseventeen from "/assets/images/flower-17.jpg";

const Contactus = () => {
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 pt-10 pb-12 max-w-7xl mt-16 mx-auto lg:px-8">
      <div className="flex flex-col gap-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#2D416A] text-start md:text-center font-head ">
          Do you want to order flower arrangement for special occasion
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-20 pt-10 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <button
                onClick={() => setShowMap(true)}
                className={`py-3 px-6 text-xl font-semibold rounded ${
                  showMap
                    ? "bg-[#2D416A] text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setShowMap(false)}
                className={`py-3 px-6 text-xl font-semibold rounded ${
                  !showMap
                    ? "bg-[#2D416A] text-white"
                    : "bg-white text-black border border-gray-300"
                }`}
              >
                Flower
              </button>
            </div>

            <div className="w-full h-[550px] overflow-hidden">
              {showMap ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.377865751993!2d86.04856137502588!3d20.836562680765155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19459fb2f58025%3A0x7bf4daac26c47803!2sRameswar%20Temple%20(Godipatia)!5e1!3m2!1sen!2sin!4v1746625642960!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Map"
                ></iframe>
              ) : (
                <img
                  src={flowerseventeen}
                  className="w-full h-full object-cover"
                  alt="Flower"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <h2 className="text-[#2D416A] text-3xl text-center font-semibold">
              Contact us
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
              <input
                type="text"
                placeholder="First Name"
                className="p-5 border border-gray-300 rounded bg-white/50"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-5 border border-gray-300 rounded bg-white/50"
              />
              <input
                type="text"
                placeholder="Email"
                className="p-5 border border-gray-300 rounded bg-white/50"
              />
              <input
                type="text"
                placeholder="Phonenumber"
                className="p-5 border border-gray-300 rounded bg-white/50"
              />
            </div>
            <div className="flex flex-col gap-4">
              <textarea
                className="w-full p-5 border border-gray-300 rounded bg-white/50"
                rows="9"
                placeholder="Your Message"
              ></textarea>
              <div className="flex flex-row gap-1 items-center">
                <input type="checkbox" id="check" className="size-5" />
                <label
                  htmlFor="check"
                  className="hover:text-[#2D416A] hover:font-semibold hover:underline cursor-pointer "
                >
                  I have read and understand the privacy policy.
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-[#2D416A] py-3 px-16 w-fit text-xl font-semibold text-white rounded">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
