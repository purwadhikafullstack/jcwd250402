const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Op } = require("sequelize");
const hbs = require("handlebars");
const fs = require("fs");
const mailer = require("../lib/nodemailer");
const crypto = require("crypto");

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Email sent!",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpired = new Date();
    resetTokenExpired.setTime(resetTokenExpired.getTime() + 10 * 60 * 1000);
    await User.update(
      {
        resetToken: resetTokenHash,
        resetTokenExpiry: resetTokenExpired,
      },
      {
        where: {
          email: req.body.email,
        },
      }
    );

    const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetTokenHash}`;
    const message = `Forgot your password? Click this link to reset your password \n${resetUrl}\nIf you didn't make this request, please ignore this email! \nToken only Valid for 10 Minutes`;
    try {
      await mailer({
        email: user.email,
        subject: "Nginapp Password Reset Request",
        message,
      });
      res.status(200).json({
        ok: true,
        hashedToken: resetTokenHash,
        resetTokenExpiry: resetTokenExpired,
      });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      res.status(500).json({
        ok: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: req.params.token,
        resetTokenExpiry: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        message: "Token is invalid or has expired",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        ok: false,
        message: "Passwords do not match",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.status(200).json({
      ok: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
  }
};
