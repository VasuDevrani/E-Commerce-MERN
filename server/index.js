import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// import routers
import productRoutes from "./Routes/ProductRoutes.js";
import seedRouter from "./Routes/SeedRoutes.js";
import UserRoutes from './Routes/UserRoutes.js'


const app = express();
dotenv.config();

// middlwares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// connecting to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("app connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use("/api/products", productRoutes);
app.use('/api/seed', seedRouter);
app.use('/api/users', UserRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app connected to PORT ${process.env.PORT}`);
});
