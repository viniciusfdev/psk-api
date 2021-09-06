import express from "express";
import UserService from "./services/user.js";
import AnimeService from "./services/anime.js";
import TestService from "./services/test.js";
import { errorMiddleware, logMiddleware } from "./utils/middlewares.utils.js";

const app = express();

// app configuration
app.use(express.json({ type: "application/json" }));
app.use(logMiddleware);

// base service routes
app.use("/user", UserService);
app.use("/anime", AnimeService);
app.use("/test", TestService);

// error handling
app.use(errorMiddleware);

export default app;
