const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Op } = require("sequelize");
const hbs = require("handlebars");
const fs = require("fs");
const mailer = require("../lib/nodemailer");
const crypto = require("crypto");

const JWT_SECRET_KEY = "ini_JWT_loh";

//* Speccifically for registering as a user role
exports.handleRegister = async (req, res) => {
  const {
    fullname,
    email,
    password,
    phoneNumber,
    // role
  } = req.body;

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
      role: "user",
    });

    // verify email by sending to email
    const token = crypto.randomBytes(20).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const verifyTokenExpiry = Date.now() + 60 * 60 * 1000;

    result.verifyToken = tokenHash;
    result.verifyTokenExpiry = verifyTokenExpiry;
    await result.save();

    const template = fs.readFileSync(
      __dirname + "/../email-template/verifyEmail.html",
      "utf8"
    );
    const compiledTemplate = hbs.compile(template);
    const verifyLink = `http://localhost:3000/verify-email?token=${tokenHash}`;
    const emailHtml = compiledTemplate({
      fullname: result.fullname,
      verifyLink,
    });

    await mailer.sendMail({
      from: "dummybro06@gmail.com",
      to: result.email,
      subject: "Verify your email address to complete your registration",
      html: emailHtml,
    });

    res.status(200).json({
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

exports.handleVerifyEmail = async (req, res) => {
  const { token } = req.query;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    where: {
      verifyToken: hashedToken,
      verifyTokenExpiry: {
        [Op.gt]: Date.now(),
      },
    },
  });

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: "Token is invalid or has expired",
    });
  }

  try {
    user.isVerified = true;
    user.verifyToken = null;
    user.verifyTokenExpiry = null;
    await user.save();

    res.status(200).json({
      ok: true,
      message: "Email verified successfully",
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
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      ok: true,
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
