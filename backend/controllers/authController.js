const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpErrors } = require("../utils/errorsUtils");

module.exports.signUp = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await User.create({ firstname, lastname, email, password });
    res.status(201).json({ user: user.id });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User unknown" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "TOKEN_SECRET", {
              expiresIn: "24h",
            }),
            isAdmin: user.isAdmin,
          });
        })
        .catch((error) => res.status(500).json({ message: "Error: " + error }));
    })
    .catch((error) => res.status(500).json({ message: "Error: " + error }));
};

module.exports.logout = (req, res) => {
  res.redirect("/");
};
