import { Link } from "react-router";
import moneyPng from "../assets/money.png";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className=" font-bold md:text-9xl  text-7xl  flex justify-center items-center ">
        <h2>4</h2>
        <img className="md:h-60 h-30" src={moneyPng} alt="" />
        <h2>4</h2>
      </div>
      <h2 className="md:text-7xl text-2xl font-bold">Page Not Found</h2>
      <Link to="/" className="mt-5 btn btn-secondary">
        Return Home
      </Link>
    </div>
  );
};
export default PageNotFound;
