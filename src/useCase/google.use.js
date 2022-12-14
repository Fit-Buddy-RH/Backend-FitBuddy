import { User } from "../models/user.models.js";
import * as Auth from "../useCase/auth.use.js";

export async function googleLogin(email, name, lastname, id) {
  const emailFound = await User.findOne({ email: email });
  let userData = "";
  let message = "";
  let token = "";
  if (!emailFound) {
    let userObject = {
      name: name,
      lastname: lastname,
      fullname: `${name} ${lastname}`,
      email: email,
      idGoogle: id,
    };
    userData = await User.create(userObject);
    message = "Usuario creado con éxito";
    token = await Auth.logIn(userData.id);
  } else {
    userData = emailFound;
    message = "Usuario loggeado con éxito";
    token = await Auth.logIn(emailFound.id);
  }
  return { userData, message, token };
}
