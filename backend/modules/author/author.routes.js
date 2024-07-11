import express from "express";
import { login, register } from "./author.controller.js";

const authorRouter = express.Router();

authorRouter.post("/register", register);
authorRouter.post("/login", login);

export default authorRouter;