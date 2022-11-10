import { RaceRequest } from "../models/race-request.models.js";
import { StatusHttp } from "../libs/customError.js";

async function getByRaceRequest(id) {
  const data = await RaceRequest.find({ race: id })
    .populate("user")
    .populate("race");
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function getByUserRequests(id) {
  const data = await RaceRequest.find({ user: id })
    .populate("user")
    .populate("race");
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function create(newRequest, user) {
  const data = await RaceRequest.create({ ...newRequest, user });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 400);
  return data;
}

async function deleteById(id) {
  const data = await RaceRequest.findByIdAndDelete(id);
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

async function update(id, newStatus) {
  const data = await RaceRequest.findByIdAndUpdate(id, newStatus, {
    new: true,
  });
  if (!data) throw new StatusHttp("Ha ocurrido un Error", 404);
  return data;
}

export { getByRaceRequest, getByUserRequests, create, deleteById, update };
