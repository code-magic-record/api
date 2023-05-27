const dayjs = require("dayjs");
const md5 = require("../../utils/md5");
const redis = require("../../redis/index");

const knex = require("../../db/index");
const { logger } = require("../../middleware/loggerMiddleware");

/**
 * 判断用户是否存在
 * @param {* 用户名 } username
 * @returns
 */
async function checkUserExists(username) {
  try {
    const result = await knex("user").select("id").where("username", username);
    return result.length > 0;
  } catch (error) {
    logger.info(error);
  }
}

/**
 * 添加用户到数据库中
 * @param {*} options
 * @returns
 */
async function addUser(options) {
  const { username, password, email, nickname, avatar } = options;
  try {
    const newUser = {
      username: username,
      email: email,
      password: password,
      nickname,
      avatar,
      create_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      update_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    const id = await knex("user").insert(newUser).returning("id");
    return id;
  } catch (error) {
    logger.info(error);
    throw new Error("Error adding a new user");
  }
}

// 用户注册
async function register(req, res) {
  const { username, password, email, nickname, avatar } = req.body;
  try {
    const newPassword = await md5.hash(password); // 密码加密
    const flag = await checkUserExists(username); // 判断是否存在
    if (flag) {
      res.send({
        code: 400,
        message: "该用户已存在",
      });
      return;
    }
    const id = await addUser({
      username,
      password: newPassword,
      email,
      nickname,
      avatar,
    });
    if (id) {
      res.send({
        code: 200,
        message: "注册成功",
      });
    }
  } catch (e) {
    logger.error(e);
  }
}

/**
 * 检测用户是否存在
 * @param {*} username
 * @param {*} password
 * @returns
 */
async function checkUser(username, password) {
  try {
    const result = await knex("user")
      .select("id", "username", "password")
      .where("username", username);
    if (result.length > 0) {
      const { password: hashPassword } = result[0];
      const flag = await md5.compare(password, hashPassword);
      return flag;
    }
    return false;
  } catch (error) {
    logger.error(error);
  }
}

// 存储用户数据和JWT令牌到Redis
const storeUserDataInRedis = async (key, userData, expiresIn) => {
  try {
    // 将用户数据转换为字符串
    const userDataString = JSON.stringify(userData);
    // 设置用户数据和令牌到Redis并设置过期时间
    await redis.set(key, userDataString, "EX", expiresIn);
    console.log("userDataString", userDataString);
    logger.info("User data and JWT token stored in Redis");
  } catch (error) {
    logger.error("Error storing user data and JWT token in Redis:");
  }
};

/**
 * 获取用户数据
 * @param {*} username
 * @returns
 */
const getUserDataFromMysql = async (username) => {
  try {
    // 从mysql获取用户数据
    const userData = await knex("user")
      .select("id", "username", "email", "nickname", "avatar")
      .where("username", username);
    logger.info("User data retrieved from MySQL");
    return userData;
  } catch (error) {
    logger.info("Error retrieving user data from MySQL:");
  }
};

// 用户登录
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const flag = await checkUser(username, password);
    if (flag) {
      const token = await md5.createToken(username);
      const userData = await getUserDataFromMysql(username);
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7天
        httpOnly: true,
      });
      // 将用户数据和JWT令牌存储到Redis
      await storeUserDataInRedis(token, userData[0], 7 * 24 * 60 * 60);
      res.send({
        code: 200,
        message: "登录成功",
        token,
      });
    }
  } catch (e) {
    logger.info(e);
  }
}

/**
 * 获取用户信息
 */
async function userInfo(req, res) {
  const { user } = req;
  res.send({
    code: 200,
    message: "获取用户信息成功",
    data: user,
  });
}

/**
 * 退出登录
 */
async function logout(req, res) {
  const { token } = req.cookies;
  res.clearCookie("token");
  await redis.del(token);
  res.send({
    code: 200,
    message: "退出登录成功",
  });
  //
}

module.exports = {
  register,
  login,
  logout,
  userInfo,
};
