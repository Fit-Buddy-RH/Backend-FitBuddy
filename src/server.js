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
import healthCheckRouter from "./routers/healthCheck.router.js";
import googleRouter from "./routers/google.router.js";
import loginRouter from "./routers/login.router.js";
import twilioRouter from "./routers/twilio.router.js";

const server = express();

//middlewares
server.use(cors());
server.use(express.json());
server.use(passport.initialize());

//Routers
server.use("/healthCheck", healthCheckRouter);
server.use("/user", userRouter);
server.use("/race", raceRouter);
server.use("/comment", commentRouter);
server.use("/raceRequest", raceRequestRouter);
server.use("/friendRequest", friendRequestRouter);
server.use("/google", googleRouter);
server.use("/login", loginRouter);
server.use("/twilio", twilioRouter);

//middleware - HandleErrors
server.use(errorHandle);

export { server };
