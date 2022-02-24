//Imports
const { User } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errorsUtils");

module.exports.uploadProfilePicture = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (error) {
    const errors = uploadErrors(error);
    return res.status(201).json({ errors });
  }
  const fileName =
    req.body.firstname + req.body.lastname + "_" + req.body.id + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/profiles/${fileName}`)
  );

  //Update picture
  try {
    await User.update(
      {
        pictureUrl: "./images/profiles/" + fileName,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((user) => {
      return res
        .status(200)
        .send({ message: "Picture updated - User id: " + user });
    });
  } catch (error) {
    res.status(400).send({ message: "Error: " + error });
  }
};
