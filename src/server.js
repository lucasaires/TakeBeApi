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

app.listen(3333, () => {
  console.log("server no ar");
});

// https://api.github.com/users/takenet/repos

const getRepositories = () => {
  const res = axios
    .get("https://api.github.com/users/takenet/repos")
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return res;
};
