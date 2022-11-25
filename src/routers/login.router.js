import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    session: false,
  }),
  async (request, response, next) => {
    response.json({
      message: "this is a response",
    });
  }
);

export default router;
