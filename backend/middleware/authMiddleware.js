const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
      if (error) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
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
      } else {
        console.log("User id: " + decodedToken.id);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};

module.exports.getUserId = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
  const userId = decodedToken.userId;

  return userId;
};

module.exports.getAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    const isAdmin = decodedToken.isAdmin;
    if (isAdmin !== true) {
      throw "interdit aux non admins";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error,
    });
  }
};
