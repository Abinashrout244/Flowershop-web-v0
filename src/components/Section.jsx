import { Link } from "react-router-dom";
import Products from "./Products";

export const Section = ({ ids }) => {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
      {ids.map((id) => {
        const Product = Products[id];
        return (
          <div key={id} className="flex flex-col items-start gap-2.5 p-[2px]  ">
            <div className="overflow-hidden rounded-[2px] ">
              <Link to={`${id}`}>
                <img
                  src={Product?.img}
                  className="object-center h-full w-full md:h-[319px] md:w-[319px] hover:scale-115 hover:opacity-70 rounded-[2px] transition-all ease-in-out  "
                />
              </Link>
            </div>
            <h1 className="md:text-xl text-lg font-semibold text-slate-600 font-syne ">
              {Product?.name}
            </h1>
            <p className="md:text-2xl text-xl font-bold text-[#2D416A] font-paragraph">
              {Product?.price}
            </p>
          </div>
        );
      })}
    </div>
  );
};
