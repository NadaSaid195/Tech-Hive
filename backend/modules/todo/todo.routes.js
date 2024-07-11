import express from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./todo.controller.js";
import authenticate from "../middleware/authenticate.js";

const todoRouter = express.Router();

todoRouter.use(authenticate);

todoRouter.get("/", getTodos);
todoRouter.post("/", addTodo);
todoRouter.put("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
