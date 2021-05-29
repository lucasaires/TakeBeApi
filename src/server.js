const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const { response } = require("express");

app.use(express.json());

app.use(cors());

app.get("/git/", async (req, res) => {
  let { size } = req.query;
  const response = await getRepositories();

  if (size - 1 < response.length) {
    return;
  }
  const obj = response.reverse()[size - 1];

  res.json(obj);
});

app.get("/", async (req, res) => {
  res.json({ ok: "works" });
});

app.listen(process.env.PORT || 3333);

// https://api.github.com/users/takenet/repos

const getRepositories = () => {
  const res = axios
    .get("https://api.github.com/users/takenet/repos")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return res;
};
