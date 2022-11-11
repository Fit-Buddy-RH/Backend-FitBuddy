import express from "express";
import {auth} from "../middleware/auth.js"
import * as raceUseCase from "../useCase/race.use.js";
import * as UserUseCase from "../useCase/user.use.js"
import * as raceRequestUseCase from "../useCase/raceRequest.use.js"
import * as commentUseCase from "../useCase/comment.use.js";

const router = express.Router();
router.use(express.json());

router.post("/", auth, async (request, response, next) => {
  try {
    const { body: newDataRace, auth } = request;
    const newRace = await raceUseCase.create(newDataRace, auth);
    
    await UserUseCase.addRace(newRace.id)
    
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


router.get("/all", async (request, response, next) => {
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

router.get("/me", auth, async (request, response, next) => {
  try {
    const {auth: id} = request
    const race = await raceUseCase.getByUser(id);
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
    const race = await raceUseCase.getByUser(id);
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

router.get("/assistants/me", auth, async (request, response, next) => {
  try {
    const {auth: id} = request
    const race = await raceUseCase.getByAssistant(id);
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

router.get("/assistants/user/:idUser", async (request, response, next) => {
  try {
    const id = request.params.idUser;
    const race = await raceUseCase.getByAssistant(id);
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

router.get("/dashboard", auth, async (request, response, next) => {
  try {
    const {location, auth:id} = request
    const race = await raceUseCase.getByZipcode(location, id);
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

router.get("/:idRace", async (request, response, next) => {
  try {
    const {idRace} = request.params
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
    const {idRace} = request.params
    const newDataRace = request.body;
    const {auth:idUser} = request
    const updatedRace = await raceUseCase.update(idRace, idUser, newDataRace);

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
    const {idRace} = request.params
    const {auth:idUser} = request
    const race = await raceUseCase.deleteById(idRace, idUser);
    await UserUseCase.deleteRace()
    await commentUseCase.deleteByRace(idRace);
    await raceRequestUseCase.deleteByRace()
    response.json({
      success: true,
      race: race,
      comments: commentsRemoval,
    });
  } catch (error) {
    next(error);
  }
});


export default router;
