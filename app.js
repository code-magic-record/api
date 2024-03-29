const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc'); // 接口文档
const swaggerUi = require('swagger-ui-express'); // 接口文档UI
const routes = require('./routes/index');
const cors = require('cors');
const { loggerMiddleware } = require('./middleware/loggerMiddleware');

const app = express();

// Swagger 配置选项
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API 文档',
      version: '1.0.0',
      description:
        'API 文档，这里简单实现了用户注册、登录、获取用户信息、获取商品列表、购买商品、获取订单列表等接口。如有疑问，可联系作者 - yaogengzhu',
    },
    servers: [
      {
        url: 'http://localhost:8001',
      },
    ],
  },

  apis: [
    './routes/auth/index.js',
    './routes/upload/index.js',
    './routes/user/user.js',
    './routes/user/user_address.js',
    './routes/goods/goods.js',
    './routes/order/order.js',
  ], // 指定包含路由定义的文件路径
};

// 生成 Swagger 规范
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json()); // 解析json
app.use(cookieParser()); // 使用cookie
app.use(loggerMiddleware); // 使用日志

app.use('/api/', routes);

app.use('/', (_, res) => {
  const dom = `<a href="/api-docs">api文档</a>`;
  res.send(dom);
});

app.use(cors());

app.listen(8001, () => {
  console.log('http://localhost:8001');
});
