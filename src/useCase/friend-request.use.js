import { FriendRequest } from "../models/friend-request.models.js";
import { StatusHttp } from "../libs/customError.js";

export async function create(idMe, idUser) {
  const data = await FriendRequest.create({
    userRequester: idMe,
    userResponder: idUser,
  });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 400);
  return data;
}

export async function getByUser(idUser) {
  const data = await FriendRequest.find({
    userResponder: idUser,
    status: "Pendiente",
  }).populate("userRequester");
  if (!data) throw new StatusHttp("Solicitud de amistad no encontrada", 404);
  return data;
}

export async function update(idFR, newStatus) {
  const data = await FriendRequest.findByIdAndUpdate(idFR, newStatus, {
    new: true,
  });
  if (!data) throw new StatusHttp("Solicitud de amistad no encontrada", 404);
  return data;
}

export async function deleteById(idFR) {
  const data = await FriendRequest.findByIdAndDelete(idFR);
  if (!data) throw new StatusHttp("Solicitud de amistad no encontrada", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await FriendRequest.deleteMany({ user: idUser });
  if (!data) throw new StatusHttp("Solicitudes no encontradas", 404);
  return data;
}
