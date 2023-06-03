const dotenv = require('dotenv');
const redis = require('../redis');
dotenv.config();

async function authMiddleware(req, res, next) {
  const { token: accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({
      code: 0,
      message: 'accessToken is missing',
    });
  }
  try {
    const userStr = await redis.get(accessToken);
    const user = JSON.parse(userStr);
    if (!user) {
      return res.status(401).json({
        code: 0,
        message: '获取用户信息失败！',
      });
    }
    req.user = user; // 将用用户信息传递下去
    next();
  } catch (err) {
    return res.status(401).json({
      code: 0,
      message: '获取用户信息失败！',
    });
  }
}

module.exports = {
  authMiddleware,
};
