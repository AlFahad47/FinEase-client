import { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";

import incomePng from "../assets/income.png";
import expensePng from "../assets/expense.png";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const [total, setTotal] = useState(0);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  const { user, loading } = use(AuthContext);

  useEffect(() => {
    axiosInstance
      .get(`/transaction/${id}`)

      .then((data) => {
        console.log("after axios get", data.data);
        setTransaction(data.data);

        axiosSecure
          .get(
            `/total-transactions?email=${user?.email}&category=${data.data.category}`
          )
          .then((res) => {
            console.log("secure transaction data", res.data.total);
            setTotal(res.data.total);
          });
      });
  }, [id, axiosInstance, user, axiosSecure]);

  console.log(id);
  return (
    <>
      <div className="flex  flex-col items-center justify-center  my-10 bg-base-300 py-5 px-12 max-w-[400px] rounded-lg min-h-96 border mx-auto">
        <h2 className="p-2 bg-accent w-full text-2xl font-bold text-center rounded-lg">
          Transaction Details
        </h2>
        <div className="flex  items-center  justify-between w-full bg-base-200 rounded-lg my-2 p-2">
          <h2 className="   font-bold ">{transaction.type}</h2>
          <h2 className="text-xl font-semibold">
            {transaction.date
              ? new Date(transaction.date).toISOString().split("T")[0]
              : ""}
          </h2>
        </div>

        <div>
          <div className="flex justify-between font-semibold text-xl">
            <h2>{transaction.amount} TK</h2>

            <h2>{transaction.category}</h2>
          </div>
          <div className="my-5">
            <div className="flex justify-between items-center mb-2.5">
              <h2 className="font-semibold text-lg ">Description</h2>
              <img
                className="w-16 h-16"
                src={transaction.type === "Income" ? incomePng : expensePng}
                alt=""
              />
            </div>

            <h2 className="text-lg "> {transaction.description}</h2>
          </div>

          <h2 className="font-semibold">
            Total Amount of this category <span>{total} TK</span>
          </h2>
        </div>
      </div>
    </>
  );
};
export default TransactionDetails;
