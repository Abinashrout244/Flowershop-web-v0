import React from "react";

const Shimmer = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-[20px] py-10 md:px-[250px] md:ml-10 mt-[500px] ">
      {Array(6)
        .fill("")
        .map((e, index) => {
          return (
            <div className="flex flex-col gap-3 items-center" key={index}>
              <div className="p-5 h-[300px] w-[300px]  flex flex-row  gap-10 rounded-md bg-slate-400/20"></div>
              <p className="py-2 rounded-md bg-slate-400/20 px-[130px]"></p>
              <p className="py-2 rounded-md bg-slate-400/20 px-[100px]"></p>
            </div>
          );
        })}
    </div>
  );
};

export default Shimmer;
