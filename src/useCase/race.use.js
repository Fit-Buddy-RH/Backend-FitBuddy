import { Race } from "../models/race.models.js";
import { StatusHttp } from "../libs/customError.js";

export async function create(newRace, user) {
  const data = await Race.create({ ...newRace, user: user, rating: null });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

export async function getAll() {
  const data = await Race.find({}).populate("user").populate("comment");
  if (!data) throw new StatusHttp("There are no posts", 400);
  return data;
}

export async function getById(id) {
  const data = await Race.findById(id).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export async function getByUser(id) {
  const data = await Race.find({ user: id })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("User has no post.", 400);
  return data;
}

export async function getByAssistant(id) {
  const data = await Race.find({ assistants: id })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("User has no post.", 400);
  return data;
}

export async function getByLocation(zipCode) {
  const data = await Race.find({ location: zipCode })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("User has no post.", 400);
  return data;
}

export async function update(idRace, idUser, raceData) {
  const data = await Race.findOneAndUpdate(
    { _id: idRace, user: idUser },
    raceData,
    {
      new: true,
    }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export async function deleteById(idRace, idUser) {
  const data = await Race.findOneAndDelete({ _id: idRace, user: idUser })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await Race.deleteMany({ user: idUser })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export async function deleteByUserAssistant(idUser) {
  const data = await Race.updateMany(
    { assistants: idUser },
    { $pull: { assistants: idUser } },
    {
      new: true,
    }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export async function addAssistant(idRace, idUser) {
  const data = await Race.findByIdAndUpdate(
    idRace,
    { $push: { assistants: idUser } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function deleteAssistant(idRace, idUser) {
  const data = await User.findByIdAndUpdate(
    idRace,
    { $pull: { assistants: idUser } },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Usuario no encontrado", 404);
  return data;
}

export async function addComment(idRace, idComment) {
  const data = await Race.findByIdAndUpdate(
    idRace,
    { $push: { comment: idComment } },
    { new: true }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}

export async function updateRating(idRace, rate) {
  const data = await Race.findByIdAndUpdate(
    idRace,
    { rating: rate },
    { new: true }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}

export async function deleteComment(idRace, idComment) {
  const data = await Race.findByIdAndUpdate(
    idRace,
    { $pull: { comment: idComment } },
    { new: true }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}
