import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const instance = axios.create({
  baseURL: "https://fine-ease-server-api.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signoutUserFunc } = useContext(AuthContext);

  // set token in the header for all the api call using axiosSecure hook

  useEffect(() => {
    //  request interceptor

    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    });

    // response interceptor

    instance.interceptors.response.use((res) => {
      return res;
    }),
      (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
          console.log("log out the user for bad request");
          signoutUserFunc().then(() => {
            navigate("/register");
          });
        }
      };
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject();
    };
  }, [user, signoutUserFunc, navigate]);

  return instance;
};

export default useAxiosSecure;
