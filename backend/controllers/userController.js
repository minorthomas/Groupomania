const { User } = require("../models");
const fs = require("fs");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "email"] },
  });
  res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "email"] },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ user });
  });
};

module.exports.updateUser = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "email"] },
  })
    .then((user) => {
      const profilePicture = user.pictureUrl.split("images/profiles")[1];
      fs.unlink(`images/profiles/${profilePicture}`, () => {
        User.update(
          {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            bio: req.body.bio,
          },
          {
            where: {
              id: user.id,
            },
          }
        )
          .then(() => res.status(201).send({ message: "Account updated" }))
          .catch((error) =>
            res.status(400).send({ message: "Error: " + error })
          );
      });
    })
    .catch((error) =>
      res.status(500).send({ message: "User not found - Error: " + error })
    );
};

module.exports.deleteUser = async (req, res) => {
  await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password", "email"] },
  })
    .then((user) => {
      const profilePicture = user.pictureUrl.split("/images/profiles")[1];
      fs.unlink(`images/profiles/${profilePicture}`, () => {
        User.destroy({
          where: {
            id: user.id,
          },
        })
          .then(() => res.status(200).json({ message: "Successfully deleted" }))
          .catch((error) =>
            res.status(400).send({ message: "Error: " + error })
          );
      });
    })
    .catch((error) =>
      res.status(500).send({ message: "User not found - Error: " + error })
    );
};
