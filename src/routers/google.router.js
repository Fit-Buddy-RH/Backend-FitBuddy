import express from "express";
import passport from "passport";
import googleStrategy from "../middlewares/passportAuth.js";
import * as Auth from "../useCase/auth.use.js";
import { User } from "../models/user.models.js";

const router = express.Router();
googleStrategy();

router.post(
  "/",
  passport.authenticate("google-token", {
    session: false,
  }),
  async (request, response, next) => {
    try {
      const {
        user: {
          _json: {
            email,
            given_name: name,
            family_name: lastname,
            picture,
            id,
          },
        },
      } = request;
      const emailFound = await User.findOne({ email: email });
      let userObject = "";
      let userData = "";
      let action = "";
      let token = "";
      if (!emailFound) {
        userObject = {
          name: name,
          lastname: lastname,
          image: picture,
          email: email,
          idGoogle: id,
        };
        userData = await User.create(userObject);
        action = "user Created";
        token = await Auth.logIn(userData.id);
      } else {
        userData = emailFound;
        action = "User Found";
        token = await Auth.logIn(emailFound.id);
      }

      response.json({
        action: action,
        token: token,
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
