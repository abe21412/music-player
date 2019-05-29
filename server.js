//import dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { verifyToken } = require("./controllers/auth"); //middleware for protected routes
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const trackRouter = require("./routers/tracks");

//app configuration
const app = express();
const port = 8080;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//router setup
app.use("/api/auth", authRouter);
app.use("/api/users", verifyToken, userRouter);
app.use("/api/tracks", verifyToken, trackRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
