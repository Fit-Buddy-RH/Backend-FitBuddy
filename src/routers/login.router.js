import express from "express";
import * as authUseCase from "../useCase/auth.use.js";

const router = express.Router();

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const token = await authUseCase.myLogIn(email, password);
    response.json({
      success: true,
      token,
    });
  } catch (error) {
    response.status(400);
    next(error);
  }
});

export default router;
