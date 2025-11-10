import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
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

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [category, setCategory] = useState("");

  const currentCategoryList = isEnabled ? expenseList : incomeList;
  const handleTypeChange = (e) => {
    setIsEnabled(e.target.checked);
    setCategory("");
  };
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const type = isEnabled ? "Expense" : "Income";
    const category = e.target.category.value;
    const amount = parseFloat(e.target.amount.value);
    const description = e.target.description.value;
    const date = e.target.date.value;
    console.log(type, category, amount, description, date);

    const newTransaction = {
      type,
      category,
      amount,
      description,
      date,
      email: user.email,
      name: user.displayName,
    };

    axiosSecure
      .post("/add-transaction", newTransaction)
      .then((data) => {
        console.log("after secure call", data.data);

        if (data.data.insertedId) {
          toast.success("Transaction Added Successfully");
        } else {
          toast.error("Failed to add Transaction");
        }
      })
      .catch((error) => {
        toast.error("Failed to add Transaction ", error);
      });
  };

  return (
    <div className="flex  flex-col items-center   my-10 bg-base-300 p-5 max-w-[600px] rounded-3xl mx-auto">
      <h2 className="font-bold my-4 text-2xl">Add Transaction</h2>
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

        <select name="category" className="select " required>
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
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="input "
          required
        />
        <input type="date" name="date" className="input " required />
        <input type="text" value={user?.email} readOnly className="input " />
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input "
        />
        <button type="submit" className="btn btn-primary mt-4">
          Add Transaction
        </button>
      </form>
    </div>
  );
};
export default AddTransaction;
