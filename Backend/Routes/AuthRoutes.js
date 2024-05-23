import express from "express";
import {
  getUserDetails,
  loginUser,
  registerUser,
} from "../Controllers/AuthControllers.js";
import { checkUser } from "../Middlewares/AuthMiddleware.js";
const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
// below one is to get user's details (userName and userId)
authRouter.get("/getuser", checkUser, getUserDetails);
export default authRouter;
