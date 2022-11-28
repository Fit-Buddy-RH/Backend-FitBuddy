import * as raceRequestUseCase from "../useCase/race-request.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import * as userUseCase from "../useCase/user.use.js";
import express from "express";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:idRace", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const { idRace } = request.params;
    const newRequest = await raceRequestUseCase.create(idUser, idRace);
    const raceInfo = await raceUseCase.getById(idRace);
    await userUseCase.addRaceRequest(raceInfo.user, newRequest.id);
    response.json({
      success: true,
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const allRequests = raceRequestUseCase.getByUser(idUser);
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

router.get("/:idRace", async (request, response, next) => {
  try {
    const { idRace } = request.params;
    const allRequests = await raceRequestUseCase.getByRace(idRace);
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
    if (status == "Aceptado")
      await raceUseCase.addAssistant(requestUpdated.race, requestUpdated.user);
    response.json({
      success: true,
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
      data: {
        requests: requestDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
