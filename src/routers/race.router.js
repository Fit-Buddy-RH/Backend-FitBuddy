import express from "express";
import { auth } from "../middlewares/auth.js";
import * as raceUseCase from "../useCase/race.use.js";
import * as userUseCase from "../useCase/user.use.js";
import * as raceRequestUseCase from "../useCase/race-request.use.js";
import * as commentUseCase from "../useCase/comment.use.js";

const router = express.Router();
router.use(express.json());

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newDataRace, auth: id } = request;
    const newRace = await raceUseCase.create(newDataRace, id);

    await userUseCase.addRace(id, newRace.id);

    response.json({
      success: true,
      message: "Carrera creada con éxito",
      data: {
        race: newRace,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (request, response, next) => {
  try {
    let {
      query: { km = 2, long, lat, user, race, me },
      auth: idme,
    } = request;
    let races = "";
    if (user) {
      const racesCreated = await raceUseCase.getByUser(user);
      const racesAssisted = await raceUseCase.getByAssistant(user);
      response.json({
        success: true,
        data: {
          racesCreated: racesCreated,
          racesAssisted: racesAssisted,
        },
      });
      return;
    } else if (me) {
      const racesCreated = await raceUseCase.getByUser(idme);
      const racesAssisted = await raceUseCase.getByAssistant(idme);
      response.json({
        success: true,
        data: {
          racesCreated: racesCreated,
          racesAssisted: racesAssisted,
        },
      });
      return;
    } else if (race) {
      races = await raceUseCase.getById(race);
    } else if (long != undefined && lat != undefined) {
      if (km < 1) km = 1;
      const coordinates = [parseFloat(long), parseFloat(lat)];
      races = await raceUseCase.getNear(coordinates, km);
    } else {
      races = await raceUseCase.getAll();
    }

    response.json({
      success: true,
      data: {
        races: races,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idRace", auth, async (request, response, next) => {
  try {
    const {
      auth: idUser,
      params: { idRace },
    } = request;
    const newDataRace = request.body;
    const updatedRace = await raceUseCase.update(idRace, idUser, newDataRace);

    response.json({
      success: true,
      message: "Carrera editada con éxito",
      data: {
        race: updatedRace,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idRace", auth, async (request, response, next) => {
  try {
    const { idRace } = request.params;
    const { auth: idUser } = request;
    const race = await raceUseCase.deleteById(idRace, idUser);
    let comments = "";
    let deleteRR = "";
    await userUseCase.deleteRace(idUser, idRace);
    if (!race.comment) {
      comments = "No hay comentarios por eliminar";
    } else {
      comments = await commentUseCase.deleteByRace(idRace);
    }
    const raceReqFound = await raceRequestUseCase.getByRace(idRace);
    if (raceReqFound.length == 0) {
      deleteRR = "No hay solicitudes de carreras por eliminar";
    } else {
      deleteRR = await raceRequestUseCase.deleteByRace(idRace);
      deleteRR.forEach(async (raceReq) => {
        await userUseCase.deleteManyRacesRequests(idUser, raceReq.id);
      });
    }
    response.json({
      success: true,
      message: "Carrera eliminada con éxito",
      race: race,
      comments: comments,
      raceRequest: deleteRR,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
