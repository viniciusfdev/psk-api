import express from "express";
import jwt from "jsonwebtoken";
import Database from "../database/db.js";

const router = express.Router();

router.get("/token", async (req, res, next) => {
  try {
    // const { userId } = req.params;
    // const user = Database.retrieve("User", { _id: userId });

    // if (!user) {
    //   return res.status(401).send();
    // }

    const accessToken = jwt.sign(
      {
        //  _id: userId
      },
      "SECRET",
      { expiresIn: "24h" }
    );
    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export default router;
