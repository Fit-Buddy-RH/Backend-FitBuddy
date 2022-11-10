import { User } from "../models/user.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function create(newUser) {
  const data = await User.create({ ...newUser });
  if (!data) throw new StatusHttp("Ha ocurrido un error", 404);
}

async function getAll() {
  const data = await User.find({})
    .populate("user")
    .populate("friend_request")
    .populate("race")
    .populate("race_request");
  if (!data) throw new StatusHttp("No hay usuarios creados", 404);
  return data;
}

async function getById(id) {
  const data = await User.findById(id)
    .populate("user")
    .populate("friend_request")
    .populate("race")
    .populate("race_request");
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function update(id, userData) {
  const data = await User.findOneAndUpdate({ _id: id }, userData, {
    new: true,
  });
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteById(id) {
  const data = await User.findOneAndDelete({ _id: id });
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function addRace(id, idRace) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $push: { racesCreated: idRace } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteRace(id, idRace) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { racesCreated: idRace } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function addRaceRequest(id, idRR) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $push: { racesRequests: idRR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteRaceRequest(id, idRR) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { racesRequests: idRR } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function addFriend(id, idFriend) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $push: { friends: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteFriend(id, idFriend) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { friends: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteUserFromFriends(id, idFriend) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { friends: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function addFriendRequest(id, idFriend) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $push: { friendsRequest: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

async function deleteFriendRequest(id, idFriend) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { $pull: { friendsRequest: idFriend } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export {
  getAll,
  getById,
  deleteById,
  update,
  create,
  addRace,
  deleteRace,
  addRaceRequest,
  addRaceRequest,
  deleteRaceRequest,
  addFriend,
  deleteFriend,
  deleteFriend,
};
