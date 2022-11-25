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

router.post("/", upload.single("image"), async (request, response, next) => {
  try {
    const { body: newDataUser, file } = request;
    const newUser = await userUseCase.create(newDataUser, file);

    response.json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (request, response, next) => {
  try {
    const allUsers = await userUseCase.getAll();

    response.json({
      success: true,
      data: {
        users: allUsers,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (request, response, next) => {
  try {
    const { auth: id } = request;
    const user = await userUseCase.getById(id);
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

router.get("/:idUser", async (request, response, next) => {
  try {
    const { idUser: id } = request.params;
    const user = await userUseCase.getById(id);
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
  "/me",
  auth,
  upload.single("image"),
  async (request, response, next) => {
    try {
      const { auth: id } = request;
      const { body: newDataUser, file } = request;
      const updatedUser = await userUseCase.update(id, newDataUser, file);
      response.json({
        success: true,
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/me", auth, async (request, response, next) => {
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
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
