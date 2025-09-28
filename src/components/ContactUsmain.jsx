import bghero from "/assets/images/contact-bg.jpg";
import { Herosection } from "../Constants";
import Contact from "../components/Contactus";
const ContactUsmain = () => {
  return (
    <div className="bg-[#DDE0EB]">
      <Herosection
        bgimage={bghero}
        heightClass="h-[350px] md:h-[550px]"
        title={"Do you have any questions?"}
      />
      <Contact />
    </div>
  );
};

export default ContactUsmain;
