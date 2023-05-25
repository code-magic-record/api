const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const { loggerMiddleware } = require("./middleware/log/index");

const app = express();

app.use(bodyParser.json()); // 解析json
app.use(cookieParser()); // 使用cookie
app.use(loggerMiddleware); // 使用日志

app.use("/api/user", routes);

app.get("/", async (req, res) => {
  res.send("server is running ");
});

app.listen(8001, () => {
  console.log("http://localhost:8001");
});
