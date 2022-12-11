import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200);
  response.send("Health Check Pass");
});

export default router;
