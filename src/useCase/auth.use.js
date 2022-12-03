import jwt from "../libs/jwt.js";

export async function logIn(id) {
  return jwt.sign({ id: id });
}
