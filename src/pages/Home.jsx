import { use, useEffect, useState } from "react";
import homeImg from "../assets/homeImg.png";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../provider/AuthContext";

const Home = () => {
  const axiosInstance = useAxios();
  const { user, loading } = use(AuthContext);
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });
  useEffect(() => {
    axiosInstance
      .get(`/overviews?email=${user?.email}`)

      .then((data) => {
        // console.log("after axios get overviews", data.data);
        setTotals(data.data);
        console.log(totals);
      });
  }, [axiosInstance, user]);
  return (
    <div>
      {/* Banner Section (motivational tagline)    */}
      <div className="flex md:flex-row  flex-col-reverse justify-center md:w-10/12 md:px-10 px-4 text-center rounded-lg gap-10   my-5 mx-auto items-center bg-accent">
        <div className="flex-1 max-w-[550px]">
          <h2 className="md:text-3xl text-xl md:font-semibold font-bold mb-2">
            FinEase — Your Personal Finance Management App
          </h2>
          <p className="md:text-lg text-sm md:mb-auto mb-5">
            FinEase helps you understand where your money goes, so you can plan
            smarter, save more, and focus on what truly matters — your growth,
            your goals, your life.
          </p>
        </div>
        <img
          className="md:max-w-[350px] max-w-[270px] flex-1"
          src={homeImg}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-center bg-base-200 py-5">
        <h2 className="font-bold md:text-4xl text-2xl text-center">
          Smart Money Management Made Simple
        </h2>
        <div className="flex md:flex-row flex-col md:gap-25 gap-7 text-center my-4">
          <div>
            <h2 className="font-normal text-sm">Total Balance</h2>
            <h2 className="font-black text-6xl mt-4">{totals.balance}</h2>
          </div>
          <div>
            <h2 className="font-normal text-sm">Total Income</h2>
            <h2 className="font-black text-6xl mt-4">{totals.totalIncome}</h2>
          </div>
          <div>
            <h2 className="font-normal text-sm">Total Expenses </h2>
            <h2 className="font-black text-6xl mt-4">{totals.totalExpense}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
