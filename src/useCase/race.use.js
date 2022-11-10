import { Race } from "../models/race.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function getAll() {
  const data = await Race.find({}).populate("user").populate("comment");
  if (!data) throw new StatusHttp("There are no posts", 400);
  return data;
}

async function getById(id) {
  const data = await Race.findById(id).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

async function getByUser(id) {
  const data = await Race.findOne({ user: id })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("User has no post.", 400);
  return data;
}

async function deleteById(id) {
  const data = await Race.findByIdAndDelete(id)
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

async function create(newRace, user) {
  const data = await Race.create({ ...newRace, user });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

async function createComment(idRace, idComment) {
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

async function deleteComment(idRace, idComment) {
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

async function update(idRace, unupdatedRace) {
  const data = await Race.findByIdAndUpdate(idRace, unupdatedRace, {
    new: true,
  })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

export {
  getAll,
  getById,
  getByUser,
  deleteById,
  update,
  create,
  createComment,
  deleteComment,
};
