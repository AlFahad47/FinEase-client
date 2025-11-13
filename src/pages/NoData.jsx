import { Link } from "react-router";
import noDataPng from "../assets/no-data.png";

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center md:h-[700px] h-[600px]">
      <div className=" font-bold md:text-9xl  text-7xl  flex justify-center items-center ">
        <img className="md:h-40 h-30" src={noDataPng} alt="" />
      </div>
      <h2 className="md:text-5xl text-2xl font-bold md:my-10">No Data Found</h2>
      <div className="space-x-3">
        <Link to="/" className="mt-5 btn btn-primary">
          Return Home
        </Link>
        <Link to="/add-transaction" className="mt-5 btn btn-primary">
          Add Transaction
        </Link>
      </div>
    </div>
  );
};
export default NoData;
