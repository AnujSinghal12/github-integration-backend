const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/temp", (req, res) => {
  const request_token = req.query.token;
  console.log(request_token);
  if (!request_token) {
    res.send({ success: false });
    return;
  }
  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=5f223379fb1a42a8258e&client_secret=7ad690da74a00bb3c0d31615f5c5bf32875575b3&code=${request_token}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    console.log(response.data);
    console.log(accessToken);

    if (accessToken === undefined) {
      res.send({ success: false });
    } else {
      res.send({ success: true, accessToken });
    }
  });
});

app.listen(3000, () => {
  console.log("App started");
});
