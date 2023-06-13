const express = require('express');
const { uploadSigleFile } = require('../../services/upload/uploadService');
const { authMiddleware } = require('../../middleware/authMiddleware');
const multipartyMiddleware = require('../../middleware/multipartyMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/upload/single_file:
 *   post:
 *     summary: 文件上传
 *     tags:
 *       - Upload
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: file
 *         in: formData
 *         description: 要上传的文件
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: 上传成功
 *       500:
 *         description: 上传失败
 */
router.post(
  '/single_file',
  authMiddleware,
  multipartyMiddleware,
  uploadSigleFile,
);

module.exports = router;
