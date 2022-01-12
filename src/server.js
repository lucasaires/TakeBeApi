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

  const cArray = response.filter((arr) => arr.language === "C#");

  const obj = cArray.sort(function (a, b) {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at > b.created_at) {
      return 1;
    }
    // a deve ser igual a b
    return 0;
  });
  const reverseArray = obj.reverse()[size - 1];

  res.json(reverseArray);
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
