import express from "express";
import cors from "cors";
import userRouter from "./routers/user.router.js";
import raceRouter from "./routers/race.router.js";
import commentRouter from "./routers/comment.router.js";
import raceRequestRouter from "./routers/race-request.router.js";
import friendRequestRouter from "./routers/friend-request.router.js";

const server = express();

//middlewares
server.use(express.json);
server.use(cors());

//Routers
server.use("./user", userRouter);
server.use("./race", raceRouter);
server.use("./comment", commentRouter);
server.use("./raceRequest", raceRequestRouter);
server.use("./friendRequest", friendRequestRouter);

//middleware - HandleErrors
server.use(errorHandle);

export { server };
