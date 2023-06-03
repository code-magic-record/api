const { validationResult } = require('express-validator');

/**
 * 参数校验中间件
 * @param {*} validations
 * @returns
 */
const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors
      .array()
      .map((err) => ({ [err.param]: err.msg }));

    res.status(400).json({
      code: 0,
      message: formattedErrors[0],
    });
  };
};

module.exports = {
  validationMiddleware,
};
