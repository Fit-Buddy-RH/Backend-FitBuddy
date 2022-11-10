import { FriendRequest } from "../models/friend-request.models.js";
import { StatusHttp } from "../libs/customError.js";

async function create(newRequest, user) {
  const data = await FriendRequest.create({ ...newRequest, user });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 400);
  return data;
}

async function getByUser(idUser) {
  const data = await FriendRequest.find({ userRequester: idUser }).populate(
    "user"
  );
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function update(idFR, newStatus) {
  const data = await FriendRequest.findByIdAndUpdate(idFR, newStatus, {
    new: true,
  });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function deleteById(idFR) {
  const data = await FriendRequest.findByIdAndDelete(idFR);
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await FriendRequest.deleteMany({ user: idUser });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}
