const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Op } = require("sequelize");
const hbs = require("handlebars");
const fs = require("fs");
const mailer = require("../lib/nodemailer");

const JWT_SECRET_KEY = "ini_JWT_loh";

// untuk nodemaoler masih belum gue pasang
exports.handleRegister = async (req, res) => {
  const { fullname, email, password, phoneNumber } = req.body;

  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }],
    },
  });

  if (existingUser) {
    return res.status(400).json({
      ok: false,
      message: "Email already registered",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      fullname,
      email,
      password: hashPassword,
      phoneNumber,
    });

    res.json({
      ok: true,
      message: "Register success",
      data: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.loginHandler = async (req, res) => {
  const { user_identity, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: user_identity }, { username: user_identity }],
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email/username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email/username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, isAdmin: user.isAdmin },
      JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
