import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./Db/Connect.js";
import authRouter from "./Routes/AuthRoutes.js";
import cors from "cors";
import bookRouter from "./Routes/BookRoutes.js";

const app = express();

// middleware to handle cors policy below
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    // set this true if u r sending token from cookie as it allows to send cookies otherwise cors policy will block cookies
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (error) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log(`server running successfully on port ${port}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
start();
