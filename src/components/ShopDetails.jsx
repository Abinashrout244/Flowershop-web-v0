import { Link, useParams } from "react-router-dom";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";
import {
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  ShoppingBag,
} from "lucide-react";

const ShopDetail = () => {
  const { id } = useParams(); // here  i am not using map bcz here i have to display one object not multiple

  const product = Products[id];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddItem = () => {
    dispatch(addItem(product));
  };
  if (!product) return <p className="text-center py-10">Product not found!</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center pt-20 md:pt-32  min-h-screen bg-[#DDE0EB] md:px-[250px] px-4 ">
      <div className="flex flex-col gap-3 items-start text-lg ">
        <div className="flex flex-row gap-2 font-paragraph">
          <ArrowBigLeftDashIcon />
          <button onClick={() => navigate("/shop")}>Back to Catalog</button>
        </div>
        <div className="overflow-hidden rounded-md">
          <img
            src={product.img}
            alt={product.name}
            className="w-[500px] md:w-[400px] h-[300px] md:h-[550px] rounded-md hover:scale-200 transition-all "
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-[#2D416A] font-head">
          {product.name}
        </h1>
        <p className="text-2xl font-bold text-[#2D416A]">
          {product?.price ?? "N/A"}
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-[#2D416A] font-syne">
            {" "}
            in Stock
          </p>
          <div className="flex flex-row gap-2 py-2 w-full rounded-md md:w-fit px-[100px] text-white bg-slate-600">
            <button className=" " onClick={() => handleAddItem()}>
              Add to Cart
            </button>
            <ShoppingBag />
          </div>

          <Link to="/cart">
            <div className="flex flex-row gap-2 py-2 w-full rounded-md md:w-fit px-[105px] font-semibold text-slate-600 bg-white">
              <button>Go to Cart</button>
              <ArrowBigRightDashIcon />
            </div>
          </Link>
        </div>
        <p className="text-[#2D416A] font-bold md:font-semibold text-[18px]  md:text-lg font-syne">
          Product Details
        </p>
        <p className="text-[16px] text-wrap font-syne">{product.details}</p>
      </div>
    </div>
  );
};

export default ShopDetail;
