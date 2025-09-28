export const Herosection = ({ bgimage, title, heightClass = "h-[350px]" }) => {
  return (
    <div>
      <div
        className={`${heightClass} bg-cover bg-center invert-20`}
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="flex justify-start items-start pt-[180px] px-5 md:px-[300px]  h-full text-white">
          <h1 className="text-4xl md:text-7xl leadng-[70px] md:leading-[80px] font-bold pl-16 text-white">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};
