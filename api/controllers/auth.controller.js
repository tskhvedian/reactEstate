import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  //db operations
  const { username, email, password } = req.body;

  //HASH PASSWORD

  const hashedPassword = await bcrypt.hash(password, 10);

  //CREATE A NEW USER AND SAVE TO DB
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });


  res.send("Hello, world!");
  console.log(newUser);
};

export const login = (req, res) => {
  //db operations
};

export const logout = (req, res) => {
  //db operations
};
