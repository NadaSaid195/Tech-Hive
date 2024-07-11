import express from "express";
import authorRouter from "./modules/author/author.routes.js";
import todoRouter from "./modules/todo/todo.routes.js";

const app = express();

app.use(express.json());

app.use("/auth", authorRouter);
app.use("/todos", todoRouter);

export default app;
