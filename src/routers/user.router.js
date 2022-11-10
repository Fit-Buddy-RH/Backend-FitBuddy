import express from "express";
import * as userUseCase from "../useCase/user.use.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();
router.use(express.json());

router.post("/", async (request, response, next) => {
  try {
    const { body: newDataUser } = request;
    const newUser = await userUseCase.create(newDataUser);

    response.json({
      success: true,
      data: {
        users: newUser,
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
    const { auth } = request;
    const user = await userUseCase.getById(auth);
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

router.get("/user:idUser", async (request, response, next) => {
  try {
    const id = request.params.idUser;
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

router.patch("/me", auth, async (request, response, next) => {
  try {
    const { auth } = request;
    const newDataUser = request.body;
    const updatedUser = await userUseCase.update(auth, newDataUser);

    response.json({
      success: true,
      data: {
        users: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/me", auth, async (request, response, next) => {
  try {
    const { auth } = request;
    const user = await userUseCase.deleteById(auth);
    await userUseCase.deleteUserFromFriends(auth);

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

export default router;
