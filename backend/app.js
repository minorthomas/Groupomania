//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const { checkUser, requireAuth } = require("./middleware/authMiddleware");

//Cors error
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

//Parse body, cookie, helmet security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.xssFilter());

//Sync bdd
const dataBase = require("./models");
dataBase.sequelize.sync();

// Jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).json(res.locals.user.id);
});

//Routes config
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

//Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

//Export
module.exports = app;
