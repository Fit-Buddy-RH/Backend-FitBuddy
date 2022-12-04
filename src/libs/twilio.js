import twilio from "twilio";
import * as dotenv from "dotenv";

dotenv.config();
const { TWILIO_ACCOUNT_ID, TWILIO_AUTH_TOKEN } = process.env;
const twilioClient = new twilio(TWILIO_ACCOUNT_ID, TWILIO_AUTH_TOKEN);

export { twilioClient };
