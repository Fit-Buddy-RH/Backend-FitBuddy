import express from "express";
import * as commentUseCase from "../useCase/comment.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:idRace", auth, async (request, response, next) => {
  try {
    const { auth: idUser } = request;
    const { idRace } = request.params;
    const newCommentData = request.body;
    const newComment = await commentUseCase.create(
      idUser,
      idRace,
      newCommentData
    );
    await raceUseCase.addComment(idRace, newComment.id);
    const rating = await commentUseCase.getRating(idRace);
    await raceUseCase.updateRating(rating);
    response.json({
      success: true,
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

router.patch("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const { auth: idUser } = request;
    const unupdatedComment = request.body;
    const updatedComment = await commentUseCase.update(
      idUser,
      idComment,
      unupdatedComment
    );
    response.json({
      success: true,
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
    const { id, race } = commentDeleted;
    await raceUseCase.deleteComment(race, id);
    response.json({
      success: true,
      data: {
        comment: commentDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
