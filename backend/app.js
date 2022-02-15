//Imports
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

//Routes
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");

// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/post", postRoutes);
// app.use("/api/comment", commentRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

//Export
module.exports = app;
