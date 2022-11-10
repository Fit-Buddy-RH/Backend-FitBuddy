import { FriendRequest } from "../models/friend-request.models.js";
import { StatusHttp } from "../libs/customError.js";

async function getByUserRequester(id) {
  const data = await FriendRequest.find({ userRequester: id }).populate("user");
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function getByUserResponder(id) {
  const data = await FriendRequest.find({ userResponder: id }).populate("user");
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function create(newRequest, user) {
  const data = await FriendRequest.create({ ...newRequest, user });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 400);
  return data;
}

async function deleteById(id) {
  const data = await FriendRequest.findByIdAndDelete(id);
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function update(id, newStatus) {
  const data = await FriendRequest.findByIdAndUpdate(id, newStatus, {
    new: true,
  });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

export { getByUserRequester, getByUserResponder, create, deleteById, update };
