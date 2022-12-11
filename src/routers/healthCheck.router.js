import express from "express";

const router = express.Router();

router.get("/", (request, response, next) => {
  response.status(200);
  next();
});

export default router;
