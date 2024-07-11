import prisma from "../../prismaClient.js";

export const getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany({ where: { userId: req.userId } });
  res.json(todos);
};

export const addTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
      userId: req.userId,
    },
  });
  res.status(201).json(todo);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await prisma.todo.update({
    where: { id },
    data: { title, completed },
  });

  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  await prisma.todo.delete({ where: { id } });

  res.sendStatus(204);
};
