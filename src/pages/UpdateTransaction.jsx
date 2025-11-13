import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const expenseList = [
  "Home",
  "Food",
  "Transportation",
  "Health",
  "Personal",
  "Education",
  "Technology",
  "Entertainment",
  "Family",
  "Others",
];

const incomeList = ["Salary", "Pocket Money", "Business"];

const UpdateTransaction = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isEnabled, setIsEnabled] = useState(false);
  const [category, setCategory] = useState("");
  const [transaction, setTransaction] = useState({});
  const currentCategoryList = isEnabled ? expenseList : incomeList;
  useEffect(() => {
    axiosSecure.get(`/transaction/${id}`).then((res) => {
      const t = res.data;
      setIsEnabled(t.type === "Expense");
      setCategory(t.category);
      setTransaction(t);
      // setLoading(false);
    });
  }, [id, axiosSecure]);

  const handleTypeChange = (e) => {
    setIsEnabled(e.target.checked);
    setCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const type = isEnabled ? "Expense" : "Income";
    const category = e.target.category.value;
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;
    const date = e.target.date.value;

    const updatedTransaction = {
      type,
      category,
      amount,
      description,
      date: new Date(date),
      updatedAt: new Date(),
    };

    try {
      const res = await axiosSecure.patch(
        `/transaction/update/${id}?email=${user.email}`,
        updatedTransaction
      );
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Transaction Updated Successfully!");
        navigate("/my-transactions");
      } else {
        toast.info("No changes detected");
      }
    } catch (error) {
      toast.error("Failed to update transaction");
      console.error(error);
    }
  };

  return (
    <div className="flex  flex-col items-center   my-10 bg-base-300 p-5 max-w-[600px] rounded-3xl mx-auto">
      <h2 className="font-bold my-4 text-2xl">Update Transaction</h2>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-2.5 items-center w-10/12 mx-auto"
      >
        <label className="switch ">
          <input
            name="type"
            type="checkbox"
            checked={isEnabled}
            onChange={handleTypeChange}
          />
          <span class="slider"></span>
        </label>

        <select
          name="category"
          className="select "
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {currentCategoryList.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="input "
          defaultValue={transaction.amount}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="input "
          defaultValue={transaction.description}
          required
        />
        <input
          type="date"
          name="date"
          className="input "
          defaultValue={
            transaction.date
              ? new Date(transaction.date).toISOString().split("T")[0]
              : ""
          }
          required
        />
        <input type="text" value={user?.email} readOnly className="input " />
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input "
        />
        <button type="submit" className="btn btn-primary mt-4">
          Update Transaction
        </button>
      </form>
    </div>
  );
};
export default UpdateTransaction;
