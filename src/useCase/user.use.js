import { User } from "../models/user.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

export async function create(newUser) {
  const data = await User.create({ ...newUser });
  if (!data) throw new StatusHttp("Ha ocurrido un error", 404);
}

export async function getAll() {
  const data = await User.find({})
    .populate("user")
    .populate("friend_request")
    .populate("race")
    .populate("race_request");
  if (!data) throw new StatusHttp("No hay usuarios creados", 404);
  return data;
}

export async function getById(id) {
  const data = await User.findById(id)
    .populate("user")
    .populate("friend_request")
    .populate("race")
    .populate("race_request");
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function update(id, userData) {
  const data = await User.findByIdAndUpdate(id, ...userData, {
    new: true,
  });
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteById(id) {
  const data = await User.findByIdAndDelete(id);
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

export async function addFriendRequest(id, idFriend) {
  const data = await User.findByIdAndUpdate(
    id,
    { $push: { friendsRequest: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteFriendRequest(id, idFriend) {
  const data = await User.findByIdAndUpdate(
    id,
    { $pull: { friendsRequest: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}
