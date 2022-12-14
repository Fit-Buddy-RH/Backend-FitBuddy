import jwt from "../libs/jwt.js";
import { User } from "../models/user.models.js";
import bcrypt from "../libs/bcrypt.js";

export async function logIn({ email, password, name, lastname, id, type }) {
  const userFound = await User.findOne({ email: email });
  let userData = "";
  let message = "";
  let token = "";
  if (type == "google") {
    if (!userFound) {
      let userObject = {
        name: name,
        lastname: lastname,
        fullname: `${name} ${lastname}`,
        email: email,
        idGoogle: id,
      };
      userData = await User.create(userObject);
      message = "Usuario creado con éxito";
      token = jwt.sign({ id: userData.id });
    } else {
      userData = userFound;
      message = "Usuario loggeado con éxito";
      token = jwt.sign({ id: userFound.id });
    }
  } else {
    if (!userFound) throw new Error("Credenciales Inválidas");
    if (!userFound.password) throw new Error("Credenciales inválidas");
    const isValidPassword = bcrypt.compare(password, userFound.password);
    if (!isValidPassword) throw new Error("Credenciales inválidas");
    userData = userFound;
    message = "Usuario loggeado con éxito";
    token = jwt.sign({ id: userFound.id });
  }
  return { userData, message, token };
}
