//import dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { verifyToken } = require("./controllers/auth"); //middleware for protected routes
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const trackRouter = require("./routers/tracks");

//app configuration
const app = express();
const port = 8080;
//middleware
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//router setup
app.use("/api/auth", authRouter);
app.use("/api/users", verifyToken, userRouter);
app.use("/api/tracks", verifyToken, trackRouter);

//serve react build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => console.log(`listening on port ${port}`));
