import { User } from "../models/user.models.js";
import { StatusHttp } from "../libs/customError.js";
import { s3 } from "../libs/s3/index.js";
import * as dotenv from "dotenv";
import jwt from "../libs/jwt.js";
import bcrypt from "../libs/bcrypt.js";

dotenv.config();

export async function create(newUser) {
  const { email, name, lastname, password } = newUser;
  const userFound = await User.findOne({ email: email });
  if (userFound) throw new StatusHttp("Correo ya existe", 401);
  if (!password) throw new StatusHttp("Se requiere contraseña", 401);
  const encriptedPwd = await bcrypt.hash(password);
  const data = await User.create({ email: email, name: name, lastname: lastname, password: encriptedPwd, fullname: `${name} ${lastname}` });
  if (!data) throw new StatusHttp("Ha ocurrido un error", 400);
  const token = jwt.sign({ id: data.id });
  return { data, token };
}

export async function getAll() {
  const data = await User.find({}).populate("friends").populate("friendsRequest").populate("racesCreated").populate("racesRequests");
  if (!data) throw new StatusHttp("No hay usuarios creados", 404);
  return data;
}

export async function getById(id) {
  const data = await User.findById(id).populate("friends").populate("friendsRequest").populate("racesCreated").populate("racesRequests");
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function getByName(name) {
  const nameTrimmed = name.trim();
  const data = await User.find({
    fullname: { $regex: nameTrimmed, $options: "i" },
  })
    .populate("friends")
    .populate("friendsRequest")
    .populate("racesCreated")
    .populate("racesRequests");
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function update(id, userData, file) {
  let userDataToSave = "";
  if (!file) {
    userDataToSave = { ...userData };
  } else {
    const user = await User.findById(id);
    if (user.image && user.imageKey) {
      s3.deleteObject({
        Key: user.imageKey,
        Bucket: process.env.AWS_BUCKET_NAME,
      }).promise();
    }
    const { location, key } = file;

    userDataToSave = { ...userData, image: location, imageKey: key };
  }
  const data = await User.findByIdAndUpdate(id, userDataToSave, {
    new: true,
  });
  if (!data) throw new StatusHttp("Ha ocurrido un error", 400);
  return data;
}

export async function deleteById(id) {
  const data = await User.findByIdAndDelete(id);
  if (data.image && data.imageKey) {
    s3.deleteObject({
      Key: data.imageKey,
      Bucket: process.env.AWS_BUCKET_NAME,
    }).promise();
  }
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function addRace(id, idRace) {
  const data = await User.findByIdAndUpdate(
    id,
    { $push: { racesCreated: idRace } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteRace(id, idRace) {
  const data = await User.findByIdAndUpdate(
    id,
    { $pull: { racesCreated: idRace } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function addRaceRequest(id, idRR) {
  const data = await User.findByIdAndUpdate(
    id,
    { $push: { racesRequests: idRR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteRaceRequest(id, idRR) {
  const data = await User.findByIdAndUpdate(
    id,
    { $pull: { racesRequests: idRR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteManyRacesRequests(idRR) {
  const data = await User.findOneAndUpdate(
    { racesRequests: idRR },
    { $pull: { racesRequests: idRR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function addFriend(id, idFriend) {
  const data = await User.findByIdAndUpdate(
    id,
    { $push: { friends: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteFriend(id, idFriend) {
  const data = await User.findByIdAndUpdate(
    id,
    { $pull: { friends: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteUserFromFriends(id) {
  const data = await User.updateMany(
    { friends: id },
    { $pull: { friends: id } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function addFriendRequest(id, idFR) {
  const data = await User.findByIdAndUpdate(
    id,
    { $push: { friendsRequest: idFR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteFriendRequest(id, idFR) {
  const data = await User.findByIdAndUpdate(
    id,
    { $pull: { friendsRequest: idFR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}
