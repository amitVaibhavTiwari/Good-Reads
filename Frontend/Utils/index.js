import axios from "axios";

export const customFetch = () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
  });
};

export const getUserData = async () => {
  try {
    const resp = await customFetch().get("api/v1/auth/getuser", {
      withCredentials: true,
    });
    if (resp.status == 200) {
      return resp.data;
    }
  } catch (error) {
    console.log(error);
  }
};
