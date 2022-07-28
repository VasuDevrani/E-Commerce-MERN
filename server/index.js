import express from "express";
import dotenv from "dotenv";
import path from 'path'
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// import routers
import productRoutes from "./Routes/ProductRoutes.js";
import seedRouter from "./Routes/SeedRoutes.js";
import UserRoutes from './Routes/UserRoutes.js'
import addRoutes from "./Routes/AddRoute.js";
import orderRoutes from "./Routes/OrderRoutes.js";

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
app.use('/api/product/add', addRoutes);
app.use('/api/order', orderRoutes);


// for hosting on heroku
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, '/client/build/index.html')))

app.listen(process.env.PORT, () => {
  console.log(`app connected to PORT ${process.env.PORT}`);
});
