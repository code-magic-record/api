const fs = require('fs');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const { fromBuffer } = require('file-type');
const { logger } = require('../../middleware/loggerMiddleware');
const cosClient = require('../../utils/cos.js');
const dayjs = require('dayjs');

dotenv.config();
const { COS_BUCKET, COS_REGION } = process.env;

const fileTypeWhiteList = ['png', 'jpeg', 'jpg'];

async function fileValidate(file, fileTypeList) {
  try {
    const { path, size, originalFilename } = file;
    const fileBuffer = fs.readFileSync(path);
    const filetype = await fromBuffer(fileBuffer);
    if (!filetype) {
      return {
        err: '文件类型错误',
      };
    }
    const { ext } = filetype;
    if (!fileTypeList.includes(ext)) {
      return {
        err: '上传图片格式有误',
      };
    }
    return {
      name: originalFilename,
      ext,
      size,
      fileBuffer,
    };
  } catch (e) {
    logger.error(e);
    return {
      err: e,
    };
  }
  //
}

async function uploadSigleFile(req, res) {
  const files = req.files;
  const { file } = files;
  const { ext, size, fileBuffer, err } = await fileValidate(
    file[0],
    fileTypeWhiteList,
  );
  // 可以校验size
  if (size < 0) {
    //
  }
  if (err) {
    return res.send({
      code: 400,
      message: err,
    });
  }
  // let fileName = name.split('.').shift();
  const key = uuidv4();
  const date = dayjs().format('YYYYMMDD'); // 时间做一个文件夹路径
  const fileName = `${date}/${key}.${ext}`;
  const { statusCode } = await new Promise((resolve, reject) => {
    cosClient.putObject(
      {
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key: fileName,
        Body: fileBuffer,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      },
    );
  });
  if (statusCode === 200) {
    return res.send({
      code: 200,
      messag: '上传成功',
      key: fileName,
    });
  }
  return res.status(500).send({
    code: statusCode,
    messag: '上传错误',
  });
}

module.exports = {
  uploadSigleFile,
};
