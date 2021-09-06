import express from "express";
import Database from "../database/db.js";

const router = express.Router();

router.get("/:collection/:id?", async (req, res, next) => {
  try {
    const { id, collection } = req.params;
    const query = req.query;
    let result;

    if (id != "" && id) {
      [result] = await Database.retrieve(collection, { _id: id });
    } else {
      result = await Database.retrieve(collection, query);
    }

    if (!result) {
      return res.status(404).end();
    }

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:collection/:id", async (req, res, next) => {
  try {
    const { id, collection } = req.params;
    const { body } = req;

    if (!body) {
      return res.status(400).send({ message: `The body object cannot be ${body}` });
    }

    if (!id || id === "") {
      return res.status(400).send({ message: `The id cannot be ${id}` });
    }

    const { modifiedCount, matchedCount } = await Database.updateOne(
      collection,
      { _id: id },
      body
    );

    res.status(201).send({ matchedCount, modifiedCount, id });
  } catch (error) {
    next(error);
  }
});

router.post("/:collection/", async (req, res, next) => {
  try {
    const { body } = req;
    const { collection } = req.params;

    if (!body) {
      return res.status(400).send({ message: `The body object cannot be ${body}` });
    }

    const { insertedId } = await Database.createOne(collection, body);

    res.status(201).send({ insertedId: insertedId });
  } catch (error) {
    next(error);
  }
});

router.delete("/:collection/:id", async (req, res, next) => {
  try {
    const { id, collection } = req.params;

    if (!id || id === "") {
      return res.status(400).send({ message: `The id cannot be ${id}` });
    }

    const { deletedCount } = await Database.delete(collection, id);

    res.status(201).send({ deletedCount, id });
  } catch (error) {
    next(error);
  }
});

export default router;
