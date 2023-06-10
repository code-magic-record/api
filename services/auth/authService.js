const knex = require('../../db/index');
const md5 = require('../../utils/md5');
const redis = require('../../redis/index');
const { logger } = require('../../middleware/loggerMiddleware');

async function checkUser(username, password) {
  try {
    const result = await knex('user')
      .select('password')
      .where('username', username);
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

async function storeUserDataInRedis(key, userData, expiresIn) {
  try {
    // 将用户数据转换为字符串
    const userDataString = JSON.stringify(userData);
    // 设置用户数据和令牌到Redis并设置过期时间
    await redis.set(key, userDataString, 'EX', expiresIn);
    logger.info('User data and JWT token stored in Redis');
  } catch (error) {
    logger.error('Error storing user data and JWT token in Redis:');
  }
}

const getUserDataFromMysql = async (username) => {
  try {
    // 从mysql获取用户数据
    const userData = await knex('user')
      .select('id', 'username', 'email', 'nickname', 'avatar', 'role_id')
      .where('username', username);
    logger.info('User data retrieved from MySQL');
    return userData;
  } catch (error) {
    logger.info('Error retrieving user data from MySQL:');
  }
};

async function login(req, res) {
  const { username, password } = req.body;
  const flag = await checkUser(username, password);
  if (!flag) {
    res.send({
      code: 400,
      message: '用户名或密码错误',
    });
    return;
  }
  const userData = await getUserDataFromMysql(username);
  const { role_id, username: name } = userData[0];
  const token = await md5.createToken(name);
  res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7天
    httpOnly: true,
  });
  // 将用户数据和JWT令牌存储到Redis
  await storeUserDataInRedis(token, userData[0], 7 * 24 * 60 * 60);
  if (role_id !== 1) {
    return res.send({
      code: 400,
      message: '您没有权限登录后台管理系统',
    });
  }
  res.send({
    code: 200,
    message: '登录成功',
    data: userData,
  });
}

module.exports = {
  login,
};
