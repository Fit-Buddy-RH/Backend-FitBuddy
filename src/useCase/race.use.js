import { Race } from "../models/race.models.js";
import { User } from "../models/user.models.js";
import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/customError.js";

export async function create(newRace, user) {
  const imageUrl = `https://fibuddy-users-bucket.s3.us-east-2.amazonaws.com/races-photos/race-${Math.floor(Math.random() * 60) + 1}.jpg`;
  const data = await Race.create({
    ...newRace,
    user: user,
    image: imageUrl,
  });
  if (!data) throw new StatusHttp("Ocurrió un error", 400);
  return data;
}

export async function getAll() {
  const data = await Race.find({ status: "Programada", isAvailable: true }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("No hay carreras por mostrar", 404);
  return data;
}

export async function getById(id) {
  const data = await Race.findById(id).populate({ path: "comment", populate: { path: "user" }, path: "user" });
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}

export async function getByUser(id) {
  const data = await Race.find({ user: id }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("No hay carreras por mostrar", 404);
  return data;
}

export async function getByAssistant(id) {
  const data = await Race.find({ assistants: id, status: "Terminada" }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("No hay carreras por mostrar", 404);
  return data;
}

export async function getNear(coordinates) {
  const data = await Race.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: coordinates,
        },
        maxDistance: 25000,
        spherical: true,
        distanceField: "distance",
        query: { status: "Programada", isAvailable: true },
      },
    },
  ]);

  await User.populate(data, { path: "user" });
  await Comment.populate(data, { path: "comment" });

  if (!data) throw new StatusHttp("No hay carreras por mostrar", 404);
  return data;
}

export async function update(idRace, idUser, raceData) {
  const data = await Race.findOneAndUpdate({ _id: idRace, user: idUser }, raceData, {
    new: true,
  })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Ocurrió un error", 400);
  return data;
}

export async function deleteById(idRace, idUser) {
  const data = await Race.findOneAndDelete({ _id: idRace, user: idUser }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await Race.deleteMany({ user: idUser }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Usuario no tiene carreras", 404);
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
  if (!data) throw new StatusHttp("Carreras no encontradas", 404);
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
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
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
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}

export async function addComment(idRace, idComment) {
  const data = await Race.findByIdAndUpdate(idRace, { $push: { comment: idComment } }, { new: true })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}

export async function updateRating(idRace, rate) {
  const data = await Race.findByIdAndUpdate(idRace, { rating: rate }, { new: true }).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}

export async function deleteComment(idRace, idComment) {
  const data = await Race.findByIdAndUpdate(idRace, { $pull: { comment: idComment } }, { new: true })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Carrera no encontrada", 404);
  return data;
}
