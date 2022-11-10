import express from "express";
import * as raceUseCase from "../useCase/race.use.js";
import * as commentUseCase from "../useCase/comment.use.js";

const router = express.Router();
router.use(express.json());

router.get("./", async (request, response, next) => {
  try {
    const allRaces = await raceUseCase.getAll();
    response.json({
      success: true,
      data: {
        races: allRaces,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:idRace", async (request, response, next) => {
  try {
    const id = request.params.idRace;
    const race = await raceUseCase.getById(id);
    response.json({
      success: true,
      data: {
        race: race,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user/:idUser", async (request, response, next) => {
  try {
    const id = request.params.idUser;
    const race = await raceUseCase.getById(id);
    response.json({
      success: true,
      data: {
        race: race,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idRace", auth, async (request, response, next) => {
  try {
    const id = request.params.idRace;
    const newDataRace = request.body;
    const updatedRace = await raceUseCase.update(id, newDataRace);

    response.json({
      success: true,
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
    const id = request.params.idRace;
    const race = await raceUseCase.deleteById(id);
    const commentsRemoval = await commentUseCase.deleteRaceComments(id);

    response.json({
      success: true,
      race: race,
      comments: commentsRemoval,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { body: newDataRace } = request;
    const newRace = await raceUseCase.create(newDataRace);

    response.json({
      success: true,
      data: {
        race: newRace,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
