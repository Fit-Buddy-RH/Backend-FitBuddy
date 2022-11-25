import { User } from "../models/user.models.js";
import { StatusHttp } from "../libs/customError.js";

export async function create(newUser, file) {
  const { location, key } = file;
  const userDataToSave = { ...newUser, image: location, imageKey: key };
  const data = await User.create({ ...userDataToSave });
  if (!data) throw new StatusHttp("Ha ocurrido un error", 404);
}

export async function getAll() {
  const data = await User.find({})
    .populate("friends")
    .populate("friendsRequest")
    .populate("racesCreated")
    .populate("racesRequests");
  if (!data) throw new StatusHttp("No hay usuarios creados", 404);
  return data;
}

export async function getById(id) {
  const data = await User.findById(id)
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
    const { location, key } = file;
    userDataToSave = { ...userData, image: location, imageKey: key };
  }
  const data = await User.findByIdAndUpdate(id, userDataToSave, {
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
