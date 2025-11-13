import { use, useEffect, useState } from "react";
import homeImg from "../assets/homeImg.png";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../provider/AuthContext";
import tipsPng from "../assets/tips.png";
import whyPng from "../assets/why.png";
import Loading from "./Loading";
import { PuffLoader } from "react-spinners";

const Home = () => {
  const axiosInstance = useAxios();
  const { user, loading, setLoading } = use(AuthContext);
  const [totals, setTotals] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/overviews?email=${user?.email}`)

      .then((data) => {
        // console.log("after axios get overviews", data.data);
        setTotals(data.data);
        console.log(totals);
      });
  }, [axiosInstance, user]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div>
      {/* Banner Section (motivational tagline)    */}
      <div className="flex md:flex-row  flex-col-reverse justify-center md:w-11/12 md:px-10 px-4 text-center rounded-lg gap-10   my-5 mx-auto items-center bg-accent">
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
      {/* smart money */}
      <div className="flex flex-col justify-center items-center bg-base-200 py-5 md:w-11/12 mx-auto rounded-lg">
        <h2 className="font-bold md:text-4xl text-2xl text-center">
          Smart Money Management Made Simple
        </h2>
        <div className="flex md:flex-row flex-col md:gap-25 gap-7 text-center my-4">
          <div className="flex flex-col items-center">
            <h2 className="font-normal text-sm">Total Balance</h2>
            <h2 className="font-black text-6xl mt-4">
              {loading ? <PuffLoader size={50}></PuffLoader> : totals.balance}
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-normal text-sm">Total Income</h2>
            <h2 className="font-black text-6xl mt-4 ">
              {loading ? <PuffLoader></PuffLoader> : totals.totalIncome}
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-normal text-sm">Total Expenses </h2>
            <h2 className="font-black text-6xl mt-4">
              {loading ? <PuffLoader></PuffLoader> : totals.totalExpense}
            </h2>
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="text-center mb-10 md:text-3xl text-xl md:font-semibold font-bold ">
          Budgeting Tips
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 text-center w-11/12 mx-auto">
          <div className="border p-5 rounded-xl">
            <div className="flex justify-between items-center w-10/12 mx-auto mb-5 ">
              <h2> Review & Adjust Monthly </h2>{" "}
              <img src={tipsPng} className="w-8" alt="" />
            </div>
            <p>
              Check your progress at the end of every month. Adapt your budget
              as your goals or income change.
            </p>
          </div>
          <div className="border p-5 rounded-xl">
            <div className="flex justify-between items-center w-10/12 mx-auto mb-5 ">
              <h2> Set Realistic Goals</h2>{" "}
              <img src={tipsPng} className="w-8" alt="" />
            </div>
            <p>
              {" "}
              Define short-term and long-term financial goals. Create budgets
              that align with your income and priorities.
            </p>
          </div>
          <div className="border p-5 rounded-xl">
            <div className="flex justify-between items-center w-10/12 mx-auto mb-5 ">
              <h2> Follow the 50/30/20 Rule</h2>{" "}
              <img src={tipsPng} className="w-8" alt="" />
            </div>
            <p>
              {" "}
              Spend 50% on needs, 30% on wants, and save 20%. This simple rule
              ensures balance and savings growth.
            </p>
          </div>
          <div className="border p-5 rounded-xl">
            <div className="flex justify-between items-center w-10/12 mx-auto mb-5 ">
              <h2> Automate Savings</h2>{" "}
              <img src={tipsPng} className="w-8" alt="" />
            </div>
            <p>
              {" "}
              Set up automatic transfers to your savings account right after
              each paycheck — pay yourself first.
            </p>
          </div>
        </div>
      </div>
      {/* Why Financial Planning Matters */}
      <div className="flex flex-col text-center ">
        <div>
          <h2 className="text-center md:mb-10 mb-5 md:text-3xl text-xl md:font-semibold font-bold ">
            Why Financial Planning Matters
          </h2>
          <div className="flex md:flex-row flex-col-reverse justify-between md:gap-30 items-center w-10/12 mx-auto mb-10">
            <img
              src={whyPng}
              className="md:max-w-[300px] max-w-[300px] flex-1"
              alt=""
            />
            <p className="flex-1 lg:text-2xl md:text-lg text-lg">
              Financial planning is more than just budgeting — it’s about
              creating a roadmap for your life. It helps you manage your income,
              control expenses, and prepare for the future with confidence. With
              a clear plan, you can make smart decisions, achieve your goals
              faster, and live with financial peace of mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
