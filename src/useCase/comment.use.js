import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

export async function create(idUser, idRace, comment) {
  const data = await Comment.create({ idRace, idUser, ...comment });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

export async function getByRace(idRace) {
  const data = await Comment.find({ race: idRace });
  if (!data) throw new StatusHttp("No comments", 404);
  return data;
}

export async function getRating(idRace) {
  const data = await Comment.find({ race: idRace })
    .populate("user")
    .populate("race");
  if (data == false) throw new StatusHttp("No comments found", 404);
  const totalRating = data.reduce((acc, comment) => {
    acc += comment.rate;
  }, 0);

  averageRate = totalRating / data.length;
  return averageRate;
}

export async function update(idUser, idComment, comment) {
  const data = await Comment.findOneAndUpdate(
    { _id: idComment, user: idUser },
    ...comment,
    { new: true }
  );
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

export async function deleteById(idComment, idUser) {
  const data = await Comment.findOneAndDelete({ _id: idComment, user: idUser });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await Comment.deleteMany({ user: idUser });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

export async function deleteByRace(idRace) {
  const data = await Comment.deleteMany({ race: idRace });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}
