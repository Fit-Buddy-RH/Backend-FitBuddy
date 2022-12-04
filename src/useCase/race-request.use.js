import { RaceRequest } from "../models/race-request.models.js";
import { StatusHttp } from "../libs/customError.js";

export async function create(idUser, idRace) {
  const data = await RaceRequest.create({ user: idUser, race: idRace });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 400);
  return data;
}

export async function getById(id) {
  const data = await RaceRequest.findById(id).populate("user").populate("race");
  if (!data) throw new StatusHttp("Solicitud de Carrera no encontrada", 404);
  return data;
}

export async function getByRace(idRace) {
  const data = await RaceRequest.find({ race: idRace })
    .populate("user")
    .populate("race");
  if (!data) throw new StatusHttp("Solicitud de Carrera no encontrada", 404);
  return data;
}

export async function getByUser(idUser) {
  console.log(idUser);
  const data = await RaceRequest.find({ user: idUser })
    .populate("user")
    .populate("race");
  if (!data) throw new StatusHttp("Solicitud de Carrera no encontrada", 404);
  return data;
}

export async function update(idRR, newStatus) {
  const data = await RaceRequest.findByIdAndUpdate(
    idRR,
    { status: newStatus },
    {
      new: true,
    }
  );
  if (!data) throw new StatusHttp("Solicitud de Carrera no encontrada", 404);
  return data;
}

export async function deleteById(idRR) {
  const data = await RaceRequest.findByIdAndDelete(idRR);
  if (!data) throw new StatusHttp("Solicitud de Carrera no encontrada", 404);
  return data;
}

export async function deleteByUser(idUser) {
  const data = await RaceRequest.deleteMany({ user: idUser });
  if (!data) throw new StatusHttp("Solicitudes no encontradas", 404);
  return data;
}

export async function deleteByRace(idRace) {
  const data = await RaceRequest.deleteMany({ race: idRace });
  if (!data) throw new StatusHttp("Solicitudes no encontradas", 404);
  return data;
}
