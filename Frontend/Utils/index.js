import axios from "axios";

// axios instance
export const customFetch = () => {
  return axios.create({
    baseURL: "https://good-reads-ktqy.onrender.com/",
    // baseURL: "http://localhost:5000/",
  });
};

// Function to get loggedin user's data (if user is Logged in)
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
