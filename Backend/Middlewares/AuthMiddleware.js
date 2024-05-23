import jwt from "jsonwebtoken";
import userModel from "../Models/User.js";
import "dotenv/config";

// middleware to verify JWT Token
export const checkUser = (req, res, next) => {
  const token = req?.cookies?.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.SECRET_KEY,

      async (err, decodedToken) => {
        if (err) {
          res.json({ message: err.message });
          return;
        } else {
          const user = await userModel.findById(decodedToken.id);
          if (user) {
            req.userId = user._id;
            next();
          } else {
            res.json({ message: "No user found" });
            return;
          }
        }
      }
    );
  } else {
    res.status(401).json({ message: "Unauthorised" });
    return;
  }
};
