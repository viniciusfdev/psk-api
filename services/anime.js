import express from "express";

import Database from "../database/db.js";

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let [ result ] = await Database.retrieve("Anime", { _id: id });

    if (!result) {
      const result = { _id: id, rank: '', meanScore: '', votes: 0 };
      const { insertedId } = await Database.createOne("Anime", result);

      if (!insertedId) {
        return res.status(400).send({ message: `Failed to retrieve anime with id "${id}".` });
      }
    }

    res.status(200).send({ anime: result });

  } catch (error) {
    next(error);
  }
});

export default router;
