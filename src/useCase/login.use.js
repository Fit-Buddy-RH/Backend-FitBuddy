import { User } from "../models/user.models.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function myLogIn() {
  return jwt.sign({ id: userFound._id });
}

export { myLogIn };
