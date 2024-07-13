import express from "express";
import authorRouter from "./modules/author/author.routes.js";
import todoRouter from "./modules/todo/todo.routes.js";
import cors from 'cors'

const app = express();

app.use(express.json());

app.use("/auth", authorRouter);
app.use("/todos", todoRouter);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // if using credentials like cookies or authorization headers
  })
);
export default app;
