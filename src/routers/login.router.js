import express from "express";
import * as authUseCases from "../useCase/auth.use.js";

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const { userData, message, token } = await authUseCases.logIn({ email: email, password: password });
    response.json({
      message: message,
      token: token,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
