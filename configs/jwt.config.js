const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("./redis.config");
const os = require("os");

module.exports = {
  //create accress token
  signAccessToken: (user) => {
    return new Promise((resolve, reject) => {
      const payload = {
        id: user._id, 
        email: user.email,
        name: user.name,
        role: user.role,
        id: user._id,
      };

  const secret = process.env.ACCESS_JWT_SECRET;

      const options = { expiresIn: "15m" };

      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.error("JWT error:", err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  //verify access token
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_JWT_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },

  //create refresh token
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_JWT_SECRET;
      const options = {
        expiresIn: "7d",
      };

      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          console.error("JWT refresh sign error:", err.message);
          return reject(createError.InternalServerError());
        }

        // save refresh token to redis
        await client.set(
          `refreshToken-${os.hostname()}-${os.platform()}-${userId}`,
          token,
          "EX",
          365 * 24 * 60 * 60
        );
        resolve(token);
      });
    });
  },
};
