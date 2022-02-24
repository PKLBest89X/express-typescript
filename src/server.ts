import { config } from "dotenv";
import express, { Application } from "express";

// import for database processing

import mongoose from "mongoose";
import connectDB from "./configs/connectDB";

// import middleware function

import cors from "cors";
import corsOptions from "./configs/corsOptions";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import { logger } from "./middlewares/logEvents";
import errorEvent from "./middlewares/errorEvent";
import verifyToken from './middlewares/verifyJWT';

// import routes

import employeeRoute from './routes/employees';
import registerRoute from './routes/register';
import authRoute from './routes/auth';
import refreshTokenRoute from './routes/refreshToken';
import logoutRoute from './routes/logout';

// <---------------------------DEFINED dotenv------------------------------->

config();

// <---------------------------Connect to Database------------------------------->

connectDB();

// <---------------------------DEFINED VARIABLES------------------------------->

const port: number = Number(process.env.PORT) || 5000;
const app: Application = express();

// <---------------------------Middlewares------------------------------->

app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// <---------------------------SOME DEFINDED------------------------------->

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// <---------------------------ROUTES------------------------------->

app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refreshToken", refreshTokenRoute);
app.use("/logout", logoutRoute);


// app.use(verifyToken);
app.use("/employees", employeeRoute);


// <---------------------------ERROR HANDLER------------------------------->

app.use(errorEvent);

// <---------------------------LISTENER------------------------------->


mongoose.connection.once("open", () => {
  console.log("Connected to Database!");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(`Connection error: ${err}`);
});
