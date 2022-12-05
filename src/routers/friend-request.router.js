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
    await userUseCase.addFriendRequest(idUser, newRequest.id);
    response.json({
      success: true,
      message: "Solicitud de amistad creada con éxito",
      data: {
        request: newRequest,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const allRequests = await friendRequestUseCase.getByUser(idUser);
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
    let requestData = "";

    if (updateRequest.status == "Aceptado") {
      requestData = await friendRequestUseCase.update(idRequest, updateRequest);
      await userUseCase.addFriend(idMe, requestData.userRequester);
      await userUseCase.addFriend(requestData.userRequester, idMe);
    } else {
      requestData = await friendRequestUseCase.deleteById(idRequest);
      await userUseCase.deleteFriendRequest(idMe, idRequest);
    }
    response.json({
      success: true,
      message: "Solicitud de amistad editada con éxito",
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
    await userUseCase.deleteFriend(idMe, requestData.userRequester);
    await userUseCase.deleteFriend(requestData.userRequester, idMe);
    response.json({
      success: true,
      message: "Solicitud de amistad eliminada con éxito",
      data: {
        requests: requestData,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
