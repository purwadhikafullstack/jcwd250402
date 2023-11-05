const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.loginHandler = async (req, res) => {
  console.log("test cok");
  const { user_identity, password } = req.body;
  user_identity = await User.findOne({
    where: {
      [Op.or]: [
        {
          username: user_identity,
        },
        {
          email: user_identity,
        },
      ],
    },
  });

  try {
    if (!user_identity) {
      return res.status(400).json({
        ok: false,
        message: "Invalid Username or Password",
      });
    }
    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        ok: false,
        message: "Invalid Username or Password",
      });
    }
    const token = jwt.sign(
      {
        id: User.id,
        role: User.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(200).json({
      ok: true,
      message: "Login Success",
      data: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
