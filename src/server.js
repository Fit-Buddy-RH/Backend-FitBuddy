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
import googleRouter from "./routers/google.router.js";
import twilioRouter from "./routers/twilio.router.js";

const server = express();

//middlewares
server.use(cors());

var whitelist = ['https://www.fitbuddy.site']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

server.use(cors(corsOptions));


// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.use(express.json());
server.use(passport.initialize());

//Routers
server.use("/user", userRouter);
server.use("/race", raceRouter);
server.use("/comment", commentRouter);
server.use("/raceRequest", raceRequestRouter);
server.use("/friendRequest", friendRequestRouter);
server.use("/google", googleRouter);
server.use("/twilio", twilioRouter);

//middleware - HandleErrors
server.use(errorHandle);

export { server };
