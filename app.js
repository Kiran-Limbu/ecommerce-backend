import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;

// db connection
import connectToDB from "./config/db/db.js";
import userRoutes from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import uploadRoutes from "./routes/upload.route.js";

const corsOptions = {
  origin: [
  "https://online-bazzer.vercel.app",
  'http://localhost:5173',
],
  // origin: "https://online-bazzer.vercel.app",
  credentials: true,
};

dotenv.config();
connectToDB();


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//creating an node server
const server = http.createServer(app);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
app.use("/api/uploads", uploadRoutes);


//listening the node server
server.listen(port, () => {
  console.log(`Server is runnig on PORT: ${port}`);
});
