import express from "express";
import { twilioClient } from "../libs/twilio.js";
import * as dotenv from "dotenv";

dotenv.config();
const { TWILIO_SERVICE_ID } = process.env;

const router = express.Router();

router.get("/verify/:to", async (request, response, next) => {
  try {
    const {
      params: { to },
    } = request;

    const verification = await twilioClient.verify.services(TWILIO_SERVICE_ID).verifications.create({ to: to, channel: "sms" });
    response.json({
      success: true,
      verification: verification,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/check/:to/:code", async (request, response, next) => {
  try {
    const {
      params: { to, code },
    } = request;
    const verification = await twilioClient.verify.services(TWILIO_SERVICE_ID).verificationChecks.create({ to: to, code: code });
    response.json({
      success: true,
      verification: verification,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
