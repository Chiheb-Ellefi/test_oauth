const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());

const YOUR_CLIENT_ID = "2571c776-fa74-49fa-a092-0ff8474761ba";

const YOUR_CLIENT_SECRET = "74k8Q~ozyjzU.OQZi17PGxGKNZ8.lUq6IcUCibQu";

async function signUp(code, res) {
  const url = `https://login.microsoftonline.com/common/oauth2/v2.0/token?client_id=2571c776-fa74-49fa-a092-0ff8474761ba&scope=https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&code=${code}&redirect_uri=https%3A%2F%2Ftest-oauth-6.onrender.com&grant_type=authorization_code&client_secret=74k8Q~ozyjzU.OQZi17PGxGKNZ8.lUq6IcUCibQu`;

  const response = await axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("data : ", data);

  // get the id token from the response
  /* const { id_token } = data;

  // verify the id token
  const verifyResponse = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
  );

  const verifyData = await verifyResponse.json();
  console.log("verifyData : ", verifyData);

  // get the user data from the verify data
  const { name, email, picture } = verifyData;
 */
  // This res.send is the key to redirecting back to our expo go app.
  // ex: you have to enter your IP adress that is running your expo go application.
  res.json({ data });
}

app.get("/", async (req, res) => {
  console.log("req.query : ", req.query);

  // use the code to get the access token

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      error: "invalid code",
    });
  }

  signUp(code, res);
});
const port = process.env.PORT || 3000;
app.listen(port, console.log("server listening on port ", port));
