import mongoose from "mongoose";

const connectDB = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("connection successful");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export default connectDB;
