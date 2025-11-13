import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, setUser, loading, updateProfileFunc } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfileFunc(displayName, photoURL)
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          displayName: displayName?.trim() ? displayName : prev.displayName,
          photoURL: photoURL?.trim() ? photoURL : prev.photoURL,
        }));

        toast.success("Update successful");
        navigate("/profile");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="flex  flex-col items-center   my-10 bg-base-300 p-5 max-w-[600px] rounded-3xl mx-auto">
      <h2 className="font-bold my-4 text-2xl">Update Profile</h2>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-2.5 items-center w-10/12 mx-auto"
      >
        <img
          className="rounded-full  h-30 w-auto border-6 border-amber-50"
          src={user?.photoURL}
          alt=""
        />

        <label className="label">Name</label>
        <input
          name="name"
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="Name"
          defaultValue={user?.displayName}
        />
        <label className="label">Photo URL</label>
        <input
          name="photo"
          onChange={(e) => setPhotoURL(e.target.value)}
          type="text"
          className="input w-full"
          placeholder="photo URL"
        />
        <button
          to="/update-profile"
          className="btn btn-neutral bg-primary mt-4  mb-2.5 w-10/12 mx-auto"
        >
          Update Information
        </button>
        <div>
          <Link to="/profile" className="link link-hover ">
            Back To Profile
          </Link>
        </div>
      </form>
    </div>
  );
};
export default UpdateProfile;
