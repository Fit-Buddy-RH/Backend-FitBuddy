import express from "express";
import passport from "passport";
import googleStrategy from "../middlewares/passportAuth.js";
import * as authUseCases from "../useCase/auth.use.js";
import { welcomeEmail } from "../libs/sendgrid.js";

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
      const { userData, message, token } = await authUseCases.logIn({ email: email, name: name, lastname: lastname, id: id, type: "google" });
      welcomeEmail(email);
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
