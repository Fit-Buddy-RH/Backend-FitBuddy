import express from "express";
import { twilioClient } from "../libs/twilio.js";
import * as dotenv from "dotenv";

dotenv.config();
const { TWILIO_SERVICE_ID } = process.env;

const router = express.Router();

router.get("/verify/:to", async (req, res) => {
  const to = req.params.to;

  twilioClient.verify
    .services(TWILIO_SERVICE_ID)
    .verifications.create({ to, channel: "sms" })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/check/:to/:code", async (req, res) => {
  const to = req.params.to;
  const code = req.params.code;
  twilioClient.verify
    .services(TWILIO_SERVICE_ID)
    .verificationChecks.create({ to, code })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});

export default router;
