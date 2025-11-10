import { use, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import incomePng from "../assets/income.png";
import expensePng from "../assets/expense.png";

const MyTransactions = () => {
  const { user, loading } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/my-transactions?email=${user?.email}`).then((data) => {
      console.log("secure bids data", data);
      setTransactions(data.data);
    });
  }, [user, axiosSecure]);

  if (loading) return <p>loading</p>;
  return (
    <div>
      <div className="grid grid-cols-3 gap-2.5 my-10">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-base-200 shadow-md hover:shadow-2xl  hover:scale-101 hover:-translate-y-2 text-center w-[240px] "
          >
            <div className="flex justify-center items-center mt-5 mb-2 gap-2.5">
              <h2 className="font-semibold text-2xl ">{transaction.type}</h2>
              <img
                className="w-16 h-16"
                src={transaction.type === "Income" ? incomePng : expensePng}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-lg font-normal">
                Category: {transaction.category}
              </h2>
            </div>
            <div className="flex justify-center items-center my-3">
              <h2 className="text-xl">Amount: </h2>
              <h2 className="text-xl">{transaction.amount} TK</h2>
            </div>
            <div className="flex justify-evenly  w-10/12 mx-auto mb-5">
              <button className="btn btn-primary ">Update </button>
              <button className="btn bg-red-500 border-0 text-white  ">
                Delete{" "}
              </button>
            </div>
            <div className="mb-5">
              <button className="btn btn-primary w-10/12">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyTransactions;
