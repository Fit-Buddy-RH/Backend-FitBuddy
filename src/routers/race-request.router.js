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
    await userUseCase.addRaceRequest(idUser, newRequest.id);
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

router.get("/:idRace", async (request, response, next) => {
  try {
    const { idRace } = request.query;
    const allRequests = raceRequestUseCase.getByRace(idRace);
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

router.patch("/:idRequest", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const updateRequest = request.body;
    const { idRequest } = request.params;
    const requestUpdated = await raceRequestUseCase.update(
      idRequest,
      updateRequest
    );

    if (updateRequest == "Aceptado")
      await raceUseCase.addAssistant(requestUpdated.race, idUser);
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

router.delete("/:idRequest", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const { idRequest } = request.params;
    const requestDeleted = await raceRequestUseCase.deleteById(idRequest);
    await userUseCase.deleteRaceRequest(idUser, requestDeleted.id);
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
