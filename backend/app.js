//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

//Cors error & helmet security
app.use(helmet());
app.use(cors());

//Parse body & cookie
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Sync bdd
const dataBase = require("./models");
dataBase.sequelize.sync();

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
