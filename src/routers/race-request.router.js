import * as raceRequestUseCase from "../useCase/race-request.use.js";
import express from "express";

const router = express.Router();

router.get("/:idRace", async (request, response, next) => {
  try {
    const { idUser } = request.query;
    const allRequests = raceRequestUseCase.getByRaceRequest(idUser);
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

router.get("/user/:idUser", async (request, response, next) => {
  try {
    const { idUser } = request.params;
    const allRequests = raceRequestUseCase.getByUserRequests(idUser);
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

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newRequestContent } = request;
    const token = request.headers.authorization;
    const { id } = jwt.decode(token);
    const newRequest = await raceRequestUseCase.create(newRequestContent, id);

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

router.delete("/:idRequest", auth, async (request, response, next) => {
  try {
    const { idRequest } = request.params;
    const requestDeleted = await raceRequestUseCase.deleteById(idRequest);
    response.status(200).json({
      success: true,
      request: requestDeleted,
      message: "request Deleted!",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idRequest", auth, async (request, response, next) => {
  try {
    const updateRequest = request.body;
    const { idRequest } = request.params;
    const requestUpdated = await raceRequestUseCase.update(
      idRequest,
      updateRequest
    );
    response.status(200).json({
      success: true,
      request: requestUpdated,
      message: "request Updated!",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
