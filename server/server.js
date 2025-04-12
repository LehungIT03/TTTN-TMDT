import express from "express";
import connectDatabase from "./config/mogodb.js";
import dotenv from "dotenv";
import ProductRoute from "./routes/productRoute.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleWare/error.js";

dotenv.config();

connectDatabase();

const app = express();
app.use(express.json());
app.use(cors());

//API
app.use("/api/product", ProductRoute);
//lấy port và URL từ file ENV
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
