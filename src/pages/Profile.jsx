import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="flex  flex-col items-center   my-10 bg-base-300 p-5 max-w-[600px] rounded-3xl mx-auto">
      <h2 className="font-bold my-4 text-2xl">My Profile</h2>
      <div className="flex flex-col gap-2.5 items-center w-10/12 mx-auto">
        <img
          className="rounded-full  h-30 w-auto border-6 border-amber-50"
          src={user?.photoURL}
          alt=""
        />
        <h2>{user?.displayName}</h2>
        <h2>{user?.email}</h2>
        <Link
          to="/update"
          className="btn btn-neutral bg-primary mt-4  mb-2.5 w-10/12 mx-auto"
        >
          Update
        </Link>
        <div>
          <Link to="/" className="link link-hover ">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Profile;
