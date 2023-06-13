const multiparty = require('multiparty');

async function multipartyMiddleware(req, res, next) {
  let config = {
    maxFieldsSize: 200 * 1024 * 1024,
  };
  try {
    new multiparty.Form(config).parse(req, (err, fields, files) => {
      if (err) {
        return res.send({
          code: 500,
          msg: err,
        });
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  } catch (e) {
    res.send({
      code: 500,
      msg: '系统错误',
    });
  }
}

module.exports = multipartyMiddleware;
