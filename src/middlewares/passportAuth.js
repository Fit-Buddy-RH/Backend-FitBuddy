import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-token";
import dotenv from "dotenv";

dotenv.config();

const authGoogle = () => {
  passport.use(
    "google-token",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          req.user = profile;
          done(null, profile);
        } catch {
          done(null, null);
        }
      }
    )
  );
};

export default authGoogle;
