import mongoose from "mongoose";

// Function responsible to connect with database.
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
