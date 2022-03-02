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
        return res.status(401).send({ error: "User unknown" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ error: "Incorrect password" });
          } else {
            const maxAge = 3 * 24 * 60 * 60 * 1000; //3j

            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
              expiresIn: maxAge,
            });
            res.cookie("jwt", token, {
              maxAge,
              httpOnly: true,
              secure: false, //https only
            });
            console.log("Cookie created");
            return res.status(200).json({
              user: user.id,
              isAdmin: user.isAdmin,
            });
          }
        })
        .catch((error) => res.status(500).send({ error: "Error: " + error }));
    })
    .catch((error) => res.status(500).json({ error: "Error: " + error }));
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};
