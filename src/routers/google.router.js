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
          _json: { email, given_name: name, family_name: lastname, id },
        },
      } = request;
      const emailFound = await User.findOne({ email: email });
      let userObject = "";
      let userData = "";
      let message = "";
      let token = "";
      if (!emailFound) {
        userObject = {
          name: name,
          lastname: lastname,
          fullname: `${name} ${lastname}`,
          email: email,
          idGoogle: id,
        };
        userData = await User.create(userObject);
        message = "Usuario creado con éxito";
        token = await Auth.logIn(userData.id);
      } else {
        userData = emailFound;
        message = "Usuario loggeado con éxito";
        token = await Auth.logIn(emailFound.id);
      }

      response.json({
        message: message,
        token: token,
        data: userData,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
