import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/customError.js";
import { text } from "express";

export async function create(idUser, idRace, comment, file) {
  let data = "";
  if (!file) {
    const { text, rate } = comment;
    const rateNumber = parseInt(rate);
    data = await Comment.create({
      race: idRace,
      user: idUser,
      text: text,
      rate: rateNumber,
    });
  } else {
    const { location, key } = file;
    const { text, rate } = comment;
    const rateNumber = parseInt(rate);
    data = await Comment.create({
      race: idRace,
      user: idUser,
      text: text,
      rate: rateNumber,
      image: location,
      imageKey: key,
    });
  }
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

export async function getByRace(idRace) {
  const data = await Comment.find({ race: idRace }).populate("user");
  if (!data) throw new StatusHttp("No comments", 404);
  return data;
}

export async function getRating(idRace) {
  const data = await Comment.find({ race: idRace });
  const totalRating = data.reduce((acc, comment) => {
    return (acc += comment.rate);
  }, 0);
  if (!totalRating) {
    return null;
  } else {
    const averageRate = totalRating / data.length;
    return averageRate.toFixed(1);
  }
}

export async function update(idUser, idComment, comment, file) {
  let data = "";
  if (!file) {
    data = await Comment.findOneAndUpdate(
      { _id: idComment, user: idUser, image: null, imageKey: null },
      ...comment,
      { new: true }
    );
  } else {
    const { location, key } = file;
    data = await Comment.findOneAndUpdate(
      { _id: idComment, user: idUser },
      { ...comment, image: location, imageKey: key },
      { new: true }
    );
  }
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
