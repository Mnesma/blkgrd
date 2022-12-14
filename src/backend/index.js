const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const setUserRoutes = require("./apis/user");
const setAuthenticationRoutes = require("./apis/authentication");
const { cookie } = require("./app.config.json");

const app = express();
const port = 8080;

app.use(cookieParser(cookie.secret));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../build/frontend")));

setAuthenticationRoutes(app);

app.get("/*", (_, res) => {
  const filePath = path.resolve(__dirname, "../../build/frontend/index.html");
  res.sendFile(filePath);
});

// setUserRoutes(app);

app.listen(port, () => {
  console.log(`Blkgrd.com listening on port ${port}.`);
});