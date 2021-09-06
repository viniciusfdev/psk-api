import express from "express";
import AnimeService from "./services/anime.js";
import { errorMiddleware, logMiddleware } from "./utils/middlewares.utils.js";
import Crud from "./services/crud.js";
import Auth from "./services/auth.js";
import {
  errorMiddleware,
  logMiddleware,
  authMiddleware,
} from "./utils/middlewares.utils.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app configuration
app.use(express.json({ type: "application/json" }));
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use(logMiddleware);

// auth
app.use("/auth", Auth);
app.use(authMiddleware);

// base service routes
app.use("/anime", AnimeService);
app.use("/", Crud);

// error handling
app.use(errorMiddleware);

export default app;
