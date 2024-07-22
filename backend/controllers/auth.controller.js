// controllers/authController.js
// const { PrismaClient } = require("@prisma/client");
const { Prisma } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../src/db");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const register = async (req, res) => {
  const { email, password, name, username, id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        id,
        email,
        password: hashedPassword,
        name,
        username,
      },
    });

    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration failed", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ token, user });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
  }
};

module.exports = { login, register };
