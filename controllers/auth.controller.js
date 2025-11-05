const db = require("../models");
const bcrypt = require("bcryptjs");
const { JwtConfig } = require("../configs");

const User = db.users;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, avatar } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Email doesn't exist!" });
      }

      const isMatch = await user.isValidPassword(password);
      
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Username/password is not valid" });
      }

      if (user.status == "BANNED") {
        return res.status(400).json({ message: "User is banned" });
      }

      const accessToken = await JwtConfig.signAccessToken(user);
      // const refreshToken = await JwtConfig.signRefreshToken(user.id);

      res.send({ accessToken });
    } catch (error) {
      if (error.errors) {
        const errors = Object.values(error.errors).map((err) => err.message);
        error = createError(422, { message: errors.join(", ") });
      }
      next(error);
    }
  },
};
