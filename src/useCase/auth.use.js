import jwt from "../libs/jwt.js";
import { User } from "../models/user.models.js";
import bcrypt from "../libs/bcrypt.js";
import { StatusHttp } from "../libs/customError.js";

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
    if (!userFound) throw new StatusHttp("Credenciales Inválidas", 401);
    if (!userFound.password) throw new StatusHttp("Credenciales inválidas", 401);
    const isValidPassword = bcrypt.compare(password, userFound.password);
    if (!isValidPassword) throw new StatusHttp("Credenciales inválidas", 401);
    userData = userFound;
    message = "Usuario loggeado con éxito";
    token = jwt.sign({ id: userFound.id });
  }
  return { userData, message, token };
}
