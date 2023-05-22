const express = require("express");
const router = express.Router();
const knex = require("../db/index");

router.get("/user", async (req, res) => {
  const images = await knex.select("*").from("image");
  res.send({
    code: 200,
    list: images,
  });
});

module.exports = router;
