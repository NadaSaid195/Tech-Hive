import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Email already in use" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, "your_jwt_secret");
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};