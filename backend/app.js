const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const auth = require("./middleware/auth");

app.use(helmet());
app.use(cors());

const dataBase = require("./models");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dataBase.sequelize.sync();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoutes);

app.use("/api/users", auth, userRoutes);
app.use("/api/posts", auth, postRoutes);
app.use("/api/comments", auth, commentRoutes);

module.exports = app;
