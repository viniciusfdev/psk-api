import express from "express";
import Database from "../database/db.js";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = req.query;
    let result;

    if (id != "" && id) {
      [result] = await Database.retrieve("Test", { _id: id });
    } else {
      result = await Database.retrieve("Test", query);
    }

    console.log(result);

    if (!result) {
      return res.status(404).end();
    }

    res.status(201).send({ result });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      return res.status(400).send({ message: `The body object cannot be ${body}` });
    }

    if (!id || id === "") {
      return res.status(400).send({ message: `The id cannot be ${id}` });
    }

    const { modifiedCount, matchedCount } = await Database.updateOne(
      "Test",
      { _id: id },
      body
    );

    res.status(201).send({ matchedCount, modifiedCount, id });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      return res.status(400).send({ message: `The body object cannot be ${body}` });
    }

    const { insertedId } = await Database.createOne("Test", body);

    res.status(201).send({ insertedId: insertedId });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || id === "") {
      return res.status(400).send({ message: `The id cannot be ${id}` });
    }

    const { deletedCount } = await Database.delete("Test", id);

    res.status(201).send({ deletedCount, id });
  } catch (error) {
    next(error);
  }
});

export default router;
