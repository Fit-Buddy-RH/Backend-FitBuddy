import * as raceRequestUseCase from "../useCase/race-request.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import * as userUseCase from "../useCase/user.use.js";
import express from "express";
import { auth } from "../middlewares/auth.js";
import { requestEmail, acceptedEmail } from "../libs/sendgrid.js";

const router = express.Router();

router.post("/:idRace", auth, async (request, response, next) => {
  try {
    const { auth: idMe } = request;
    const { idRace } = request.params;
    await raceRequestUseCase.searchRequest({ idUser: idMe, idRace });
    const newRequest = await raceRequestUseCase.create(idMe, idRace);
    const raceInfo = await raceUseCase.getById(idRace);
    const { email: emailResponder, name, fullname, level, image } = await userUseCase.getById(raceInfo.user);
    requestEmail(emailResponder, name, fullname, level, image, raceInfo.type, raceInfo.title, raceInfo.date);
    await userUseCase.addRaceRequest(raceInfo.user, newRequest.id);
    response.json({
      success: true,
      message: "Solicitud de Carrera creada con éxito",
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const { idRace, idUser } = request.query;
    let allRequests = "";
    if (idRace) {
      allRequests = await raceRequestUseCase.getByRace(idRace);
    } else if (idUser) {
      allRequests = await raceRequestUseCase.getByUser(idUser);
    }
    response.json({
      success: true,
      data: {
        requests: allRequests,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idRequest", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const { status } = request.body;
    const { idRequest } = request.params;
    const requestUpdated = await raceRequestUseCase.update(idRequest, status);
    await userUseCase.deleteRaceRequest(idUser, idRequest);
    if (status == "Aceptado") {
      const { email, name } = await userUseCase.getById(requestUpdated.user);
      const {
        user,
        level,
        title,
        description,
        km,
        image: raceImage,
        date,
        type,
        quantity,
        assistants,
      } = await raceUseCase.addAssistant(requestUpdated.race, requestUpdated.user);
      const { name: runnerName } = await userUseCase.getById(user);

      acceptedEmail(runnerName, email, name, level, km, raceImage, type, title, date, description);

      if (quantity == assistants.length) {
        raceUseCase.update(requestUpdated.race, requestUpdated.user, {
          isAvailable: false,
        });
      }
    }
    response.json({
      success: true,
      message: "Solicitud de Carrera editada con éxito",
      data: {
        requests: requestUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idRequest", async (request, response, next) => {
  try {
    const { idRequest } = request.params;
    const requestDeleted = await raceRequestUseCase.deleteById(idRequest);
    const raceInfo = await raceUseCase.getById(requestDeleted.race);
    await userUseCase.deleteRaceRequest(raceInfo.user, requestDeleted.id);
    response.json({
      success: true,
      message: "Solicitud de Carrera eliminada con éxito",
      data: {
        requests: requestDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
