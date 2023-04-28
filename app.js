const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const routes = require("./routes/index");

const app = express();

app.use(bodyParser.json()); // 解析json
app.use(cookieParser()); // 使用cookie
app.use(morgan("short")); // 使用日志

app.use("/", routes);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
