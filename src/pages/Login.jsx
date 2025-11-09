import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const {
    signInWithEmailAndPasswordFunc,
    setUser,
    setLoading,
    signInWithGoogleFunc,
  } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    // console.log({ email, password });
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        console.log(res);
        setLoading(false);

        setUser(res.user);
        toast.success("Signin successful");
        navigate(from);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="flex mt-[50px] min-h-[720px] md:w-11/12 mx-auto">
      <div className="flex-3 flex flex-col items-center justify-center  md:shadow-sm md:rounded-l-xl md:border border-r-0 md:border-accent-content">
        <h2 className="text-center font-extrabold text-4xl mb-10 text-primary">
          Sign in to FinEase
        </h2>
        <form
          onSubmit={handleLogin}
          action=""
          className="fieldset lg:w-7/12 md:11/12 mx-auto max-w-[320px] "
        >
          {/* email */}
          <label className="input validator min-h-[52px] mb-4">
            <svg
              className="h-[1em] opacity-50 text-base-content"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              name="email"
              type="email"
              className="  text-base-content"
              placeholder="Email"
            />
          </label>

          {/* password */}
          <label className="input validator min-h-[52px]">
            <svg
              className="h-[1em] opacity-50 text-base-content"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>

            <input
              name="password"
              type="password"
              className=" w-full text-base-content"
              placeholder="Password"
            />
          </label>
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Sign In"
          />
        </form>
        <p className="pt-4 md:w-7/12  mb-10 max-w-[320px]  mx-auto">
          New to our website? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800 " to="/register">
            Register
          </Link>{" "}
        </p>
      </div>
      <div className="flex-2  flex-col justify-center items-center space-y-5 bg-[radial-gradient(circle,#38A3A2_17%,#298987_49%,#10605D_100%)] rounded-r-xl  md:flex hidden text-white">
        <h2 className="font-bold text-3xl t ">Hello, Friends</h2>
        <p className="">Manage your finances smarter.</p>
      </div>
    </div>
  );
};
export default Login;
