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
      const { _json: userGoogleData } = request.user;
      const emailFound = await User.findOne({ email: userGoogleData.email });
      let userObject = "";
      let userData = "";
      let action = "";
      let token = "";
      if (!emailFound) {
        userObject = {
          name: userGoogleData.given_name,
          lastname: userGoogleData.family_name,
          birthdate: "1999-01-01",
          image: userGoogleData.picture,
          imageKey: null,
          level: "Principiante",
          email: userGoogleData.email,
          idGoogle: userGoogleData.id,
          idFacebook: null,
        };
        userData = await User.create(userObject, null);
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
