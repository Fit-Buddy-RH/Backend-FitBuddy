import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/customError.js";
import { s3 } from "../libs/s3/index.js";

export async function create(idUser, idRace, comment, file) {
  let data = "";
  if (!file) {
    const { text, rate, title } = comment;
    const rateNumber = parseInt(rate);
    data = await Comment.create({
      race: idRace,
      user: idUser,
      text: text,
      rate: rateNumber,
      title: title,
    });
  } else {
    const { location, key } = file;
    const { text, rate, title } = comment;
    const rateNumber = parseInt(rate);
    data = await Comment.create({
      race: idRace,
      user: idUser,
      text: text,
      title: title,
      rate: rateNumber,
      image: location,
      imageKey: key,
    });
  }
  if (!data) throw new StatusHttp("Ha ocurrido un error", 400);
  return data;
}

export async function getByRace(idRace) {
  const data = await Comment.find({ race: idRace }).populate("user");
  if (!data) throw new StatusHttp("No hay comentarios para mostrar", 404);
  return data;
}

export async function getRating(idRace) {
  const data = await Comment.find({ race: idRace });
  if (!data) throw new StatusHttp("Comentarios no encontrados", 404);
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
    data = await Comment.findOneAndUpdate({ _id: idComment, user: idUser }, ...comment, { new: true });
  } else {
    const commentFound = await Comment.findById(idComment);
    if (commentFound.image && commentFound.imageKey && commentFound.user == idUser) {
      s3.deleteObject({
        Key: commentFound.imageKey,
        Bucket: process.env.AWS_BUCKET_NAME,
      }).promise();
    }
    const { location, key } = file;
    data = await Comment.findOneAndUpdate({ _id: idComment, user: idUser }, { ...comment, image: location, imageKey: key }, { new: true });
  }
  if (!data) throw new StatusHttp("Comentario no encontrado", 404);
  return data;
}

export async function deleteById(idComment, idUser) {
  const commentFound = await Comment.findById(idComment);
  if (commentFound.image && commentFound.imageKey && commentFound.user == idUser) {
    s3.deleteObject({
      Key: commentFound.imageKey,
      Bucket: process.env.AWS_BUCKET_NAME,
    }).promise();
  }
  const data = await Comment.findOneAndDelete({ _id: idComment, user: idUser });
  if (!data) throw new StatusHttp("Comentario no encontrado", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await Comment.deleteMany({ user: idUser });
  if (!data) throw new StatusHttp("Comentarios no encontrados", 404);
  return data;
}

export async function deleteByRace(idRace) {
  const data = await Comment.deleteMany({ race: idRace });
  if (!data) throw new StatusHttp("Comentarios no encontrados", 404);
  return data;
}
