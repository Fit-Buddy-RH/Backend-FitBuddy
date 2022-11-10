import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function getById(id) {
  const data = await Comment.findById(id).populate("user").populate("race");
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function getByRace(id) {
  const data = await Comment.find({ race: id })
    .populate("user")
    .populate("race");
  if (data == false) throw new StatusHttp("No comments found", 404);
  return data;
}

async function getByUser(id) {
  const data = await Comment.find({ user: id })
    .populate("user")
    .populate("race");
  if (!data) throw new StatusHttp("No comments found", 404);
  return data;
}

async function create(newComment, user) {
  const data = await Comment.create({ ...newComment, user });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

async function update(id, newComment) {
  const data = await Comment.findByIdAndUpdate(id, newComment, { new: true });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function deleteById(id) {
  const data = await Comment.findByIdAndDelete(id);
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function deleteRaceComments(idRace) {
  const data = await Comment.deleteMany({ race: idRace });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

export {
  create,
  getById,
  getByRace,
  getByUser,
  update,
  deleteById,
  deleteRaceComments,
};
