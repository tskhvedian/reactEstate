import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  //db operations
  const { username, email, password } = req.body;

  try {
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

    //send response
    res.status(201).json({ message: "User created successfuly" });
    console.log(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;

  try {
    //CHECK IF USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials!" });
    //IF PASSWORD CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    //GENERATE COOKIE TOKEN AND SEND TO USER
    res.setHeader("Set-Cookie", "test=" + "myValue")
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  //db operations
};
