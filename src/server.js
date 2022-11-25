import express from "express";
import cors from "cors";
import passport from "passport";
import { errorHandle } from "./middlewares/errorHandle.js";
import "./middlewares/passportAuth.js";
import userRouter from "./routers/user.router.js";
import raceRouter from "./routers/race.router.js";
import commentRouter from "./routers/comment.router.js";
import raceRequestRouter from "./routers/race-request.router.js";
import friendRequestRouter from "./routers/friend-request.router.js";
import loginRouter from "./routers/login.router.js";
import googleRouter from "./routers/google.router.js";

const server = express();

//middlewares
server.use(express.json());
server.use(cors());
server.use(passport.initialize());

//Routers
server.use("/user", userRouter);
server.use("/race", raceRouter);
server.use("/comment", commentRouter);
server.use("/raceRequest", raceRequestRouter);
server.use("/friendRequest", friendRequestRouter);
server.use("/login", loginRouter);
server.use("/google", googleRouter);

//middleware - HandleErrors
server.use(errorHandle);

export { server };
