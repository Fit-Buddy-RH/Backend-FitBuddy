import * as friendRequestUseCase from "../useCase/friend-request.use.js";
import * as userUseCase from "../useCase/user.use.js";
import express from "express";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:idUser", auth, async (request, response, next) => {
  try {
    const { auth: idMe } = request;
    const { idUser } = request.params;
    const newRequest = await friendRequestUseCase.create(idMe, idUser);
    await userUseCase.addFriendRequest(id, newRequest.id);
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
    const { auth: idUser } = request.query;
    const allRequests = friendRequestUseCase.getByUser(idUser);
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
    const { auth: idMe } = request;
    const updateRequest = request.body;
    const { idRequest } = request.params;
    const requestData = "";

    if (updateRequest.status == "aceptado") {
      const requestData = await friendRequestUseCase.update(
        idRequest,
        updateRequest
      );
      await userUseCase.addFriend(idMe, requestData.userResponder);
    } else {
      const requestData = await friendRequestUseCase.deleteById(idRequest);
      await userUseCase.deleteFriend(idMe, requestData.userResponder);
      await userUseCase.deleteFriendRequest(idMe, idRequest);
    }
    response.json({
      success: true,
      data: {
        requests: requestData,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idRequest", auth, async (request, response, next) => {
  try {
    const { auth: idMe } = request;
    const { idRequest } = request.params;
    const requestData = await friendRequestUseCase.deleteById(idRequest);
    await userUseCase.deleteFriendRequest(idMe, idRequest);
    response.json({
      success: true,
      data: {
        requests: requestData,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
