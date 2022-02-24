const { Post } = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errorsUtils");

module.exports.getAllPosts = async (req, res) => {
  await Post.findAll({
    include: ["users", "comments"],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).send("Error to get data" + error));
};

module.exports.getOnePost = async (req, res) => {
  await Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
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
    fileName = Date.now() + "_" + req.body.userId + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(`${__dirname}/../images/posts/${fileName}`)
    );
  }

  const newPost = {
    userId: req.body.userId,
    post: req.body.post,
    pictureUrl: req.file !== null ? "./images/posts/" + fileName : "",
    videoUrl: req.body.videoUrl,
  };

  try {
    await Post.create(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updatePost = async (req, res) => {
  await Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      Post.update(
        {
          post: req.body.post,
        },
        {
          where: {
            id: post.id,
          },
        }
      )
        .then(() => res.status(201).send({ message: "Post updated" }))
        .catch((error) => res.status(400).send({ message: "Error: " + error }));
    })
    .catch((error) =>
      res.status(500).send({ message: "Post not found - Error: " + error })
    );
};

module.exports.deletePost = async (req, res) => {
  await Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      Post.destroy({
        where: {
          id: post.id,
        },
      })
        .then(() => res.status(200).json({ message: "Successfully deleted" }))
        .catch((error) => res.status(400).send({ message: "Error: " + error }));
    })
    .catch((error) =>
      res.status(500).send({ message: "Post not found - Error: " + error })
    );
};
