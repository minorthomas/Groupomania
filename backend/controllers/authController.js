const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { signUpErrors } = require("../utils/errorsUtils");

const maxAge = 3 * 24 * 60 * 60 * 1000; //3 jours
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

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
      const token = createToken(user.id);
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password" });
          }
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({ user: user.id });
        })
        .catch((error) => res.status(500).json({ message: "Error: " + error }));
    })
    .catch((error) => res.status(500).json({ message: "Error: " + error }));
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
