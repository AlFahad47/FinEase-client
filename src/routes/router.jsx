import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddTransaction from "../pages/AddTransaction";
import MyTransactions from "../pages/MyTransactions";
import UpdateTransaction from "../pages/UpdateTransaction";
import TransactionDetails from "../pages/TransactionDetails";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
import UpdateProfile from "../pages/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-transaction", element: <AddTransaction /> },
      { path: "/my-transactions", element: <MyTransactions /> },
      { path: "/update-transaction/:id", element: <UpdateTransaction /> },
      { path: "/transaction-details/:id", element: <TransactionDetails /> },
      { path: "/reports", element: <Reports /> },
      { path: "/profile", element: <Profile /> },
      { path: "/update-profile", element: <UpdateProfile /> },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  { path: "/*", element: <PageNotFound /> },
]);
