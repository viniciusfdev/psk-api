import http from "http";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const httpServer = http.createServer(app);
const PORT = process.env.PORT;

httpServer.listen(PORT, () => console.log("Server start at port", PORT));
