import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance
      .get(`/transaction/${id}`)

      .then((data) => {
        console.log("after axios get", data.data);
        setTransaction(data.data);
      });
  }, [id, axiosInstance]);

  console.log(id);
  return (
    <div className="flex  flex-col items-center   my-10 bg-base-300 p-5 max-w-[600px] rounded-3xl mx-auto">
      <h2 className="font-bold my-4 text-2xl">Transaction Details</h2>
      <div>
        <h2>{transaction.category}</h2>
        <h2>{transaction.date}</h2>
        <h2>{transaction.description}</h2>
        <h2>{transaction.email}</h2>
        <h2>{transaction.name}</h2>
        <h2>{transaction.type}</h2>
        <h2>{transaction.date}</h2>
      </div>
    </div>
  );
};
export default TransactionDetails;
