const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header is missing",
    });
  }

  const accessToken = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    // TODO: 校验数据是否一致
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid access token",
    });
  }
}

module.exports = authMiddleware;
