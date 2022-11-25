import { User } from "../models/user.models.js";
import jwt from "../libs/jwt.js";
import { StatusHttp } from "../libs/customError.js";

export async function logIn(id) {
  return jwt.sign({ id: id });
}
