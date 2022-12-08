import express from "express";
import * as commentUseCase from "../useCase/comment.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:idRace", auth, upload.single("image"), async (request, response, next) => {
  try {
    const { auth: idUser, file } = request;
    const { idRace } = request.params;
    const newCommentData = request.body;
    const newComment = await commentUseCase.create(idUser, idRace, newCommentData, file);
    await raceUseCase.addComment(idRace, newComment.id);
    const rating = await commentUseCase.getRating(idRace);
    await raceUseCase.updateRating(idRace, rating);
    response.json({
      success: true,
      message: "Comentario creado con éxito",
      data: {
        comment: newComment,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:idRace", async (request, response, next) => {
  try {
    const { idRace } = request.params;
    const comments = await commentUseCase.getByRace(idRace);
    response.json({
      success: true,
      data: {
        comments: comments,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idComment", auth, upload.single("image"), async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const { auth: idUser, file } = request;
    const unupdatedComment = request.body;
    const updatedComment = await commentUseCase.update(idUser, idComment, unupdatedComment, file);
    const rating = await commentUseCase.getRating(updatedComment.race);
    await raceUseCase.updateRating(updatedComment.race, rating);
    response.json({
      success: true,
      message: "Comentario editado con éxito",
      data: {
        comment: updatedComment,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const { auth: idUser } = request;
    const commentDeleted = await commentUseCase.deleteById(idComment, idUser);
    const { race: idRaceUnparsed } = commentDeleted;
    const idRace = idRaceUnparsed.toString();
    const rating = await commentUseCase.getRating(idRace);
    await raceUseCase.updateRating(idRace, rating);
    await raceUseCase.deleteComment(idRace, idComment);
    response.json({
      success: true,
      message: "Comentario eliminado con éxito",
      data: {
        comment: commentDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
