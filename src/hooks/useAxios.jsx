import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fine-ease-server-api.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
