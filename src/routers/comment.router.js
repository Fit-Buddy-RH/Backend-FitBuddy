import express from "express";
import * as commentUseCase from "../useCase/comment.use.js";
import * as raceUseCase from "../useCase/race.use.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:idRace", async (request, response, next) => {
  try {
    const { idRace } = request.params;
    const allRaceComments = await commentUseCase.getById(idRace);
    response.json({
      success: true,
      data: {
        comment: allRaceComments,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const { idUser, idRace } = request.query;
    let allComments = "";
    if (idUser) {
      allComments = await commentUseCase.getByUser(idUser);
    } else if (idRace) {
      allComments = await commentUseCase.getByRace(idRace);
    } else {
      throw new StatusHttp("neither an user nor a post are declare!", 404);
    }

    if (!allComments) {
      throw new StatusHttp("no comments found!", 404);
    }
    response.json({
      success: true,
      data: {
        comment: allComments,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (request, response, next) => {
  try {
    const newCommentContent = request.body;
    const token = request.headers.authorization;
    const { id } = jwt.decode(token);
    const newComment = await commentUseCase.create(newCommentContent, id);
    const raceUpdated = await raceUseCase.createComment(
      newComment.race,
      newComment.id
    );
    response.json({
      success: true,
      data: {
        comment: newComment,
      },
      race: {
        raceUpdate: raceUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const unupdatedComment = request.body;
    const updatedComment = await commentUseCase.update(
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
    const commentDeleted = await commentUseCase.deleteById(idComment);
    const raceId = commentDeleted.race.toString();
    const raceUpdated = await raceUseCase.deleteComment(
      raceId,
      commentDeleted.id
    );
    response.json({
      success: true,
      data: {
        comment: commentDeleted,
      },
      race: {
        race: raceUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
