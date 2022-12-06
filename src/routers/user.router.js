import express from "express";
import * as userUseCase from "../useCase/user.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import * as commentUseCase from "../useCase/comment.use.js";
import * as raceRequestUseCase from "../useCase/race-request.use.js";
import * as friendRequestUseCase from "../useCase/friend-request.use.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.use(express.json());

router.get("/", auth, async (request, response, next) => {
  try {
    let {
      query: { me, raceRequest, sentRequests, idUser, search },
    } = request;
    const { auth: idme } = request;
    let user = "";
    if (idUser) {
      user = await userUseCase.getById(idUser);
    } else if (me) {
      user = await userUseCase.getById(idme);
    } else if (raceRequest) {
      user = await userUseCase.getById(idme);
      const requestsIds = user.racesRequests;
      let requests = [];
      for (const request of requestsIds) {
        const populateRequest = await raceRequestUseCase.getById(request.id);
        requests.push(populateRequest);
      }
      response.json({
        success: true,
        data: {
          raceRequests: requests,
        },
      });
      return;
    } else if (sentRequests) {
      const requests = await raceRequestUseCase.getByUser(idme);
      response.json({
        success: true,
        data: {
          raceRequests: requests,
        },
      });
      return;
    } else if (search) {
      user = await userUseCase.getByName(search);
    } else {
      const allUsers = await userUseCase.getAll();

      response.json({
        success: true,
        data: {
          users: allUsers,
        },
      });
      return;
    }
    response.json({
      success: true,
      data: {
        users: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/",
  auth,
  upload.single("image"),
  async (request, response, next) => {
    try {
      const { auth: id } = request;
      const { body: newDataUser, file } = request;
      const updatedUser = await userUseCase.update(id, newDataUser, file);
      response.json({
        success: true,
        message: "El Usuario fue editado con éxito",
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/", auth, async (request, response, next) => {
  try {
    const { auth: id } = request;
    const user = await userUseCase.deleteById(id);
    await userUseCase.deleteUserFromFriends(id);
    await raceUseCase.deleteByUser(id);
    await raceUseCase.deleteByUserAssistant(id);
    await commentUseCase.deleteByUser(id);
    await raceRequestUseCase.deleteByUser(id);
    await friendRequestUseCase.deleteByUser(id);
    response.json({
      success: true,
      message: "Usuario borrado con éxito",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
