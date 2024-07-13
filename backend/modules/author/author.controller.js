import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prismaClient.js";

export const register = async (req, res) => {
  console.log(req.body);
  const { email, password, confirmPass, fullName, DoB } = req.body;

  // Check if password and confirmPass match
  if (password !== confirmPass) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        DoB: new Date(DoB), // Ensure DoB is a valid Date object
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: "Email already in use" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        status: "success",
        message: "Logged IN!",
        data: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          DoB: user.DoB,
        },
      });
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Invalid credentials",
        data: null,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
    });
  }
};
