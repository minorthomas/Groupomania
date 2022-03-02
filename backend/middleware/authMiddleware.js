const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findByPk(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.send(200).json("No token");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
