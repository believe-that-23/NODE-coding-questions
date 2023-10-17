import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import jwtAuth from "./src/middleware/jwt.middleware.js";

import userRouter from "./src/features/user/user.route.js";
import friendshipRouter from "./src/features/friendship/friendship.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";

const server = express();
dotenv.config();

server.use(cookieParser());
server.use(express.json());
server.use(cors());

server.use("/api/users", userRouter);
server.use("/api/friends", jwtAuth, friendshipRouter);
server.use("/api/otp", otpRouter);

server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

server.use((req, res) => {
  return res.status(404).send("API not found");
});

export default server;