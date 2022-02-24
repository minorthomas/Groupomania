const { Comment } = require("../models");

module.exports.getAllComments = async (req, res) => {
  await Comment.findAll({
    where: {
      postId: req.params.id,
    },
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).send("Error to get data" + error));
};

module.exports.createComment = async (req, res) => {
  const newComment = {
    userId: req.body.userId,
    postId: req.body.postId,
    comment: req.body.comment,
  };
  try {
    await Comment.create(newComment);
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updateComment = async (req, res) => {
  await Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      Comment.update(
        {
          comment: req.body.comment,
        },
        {
          where: {
            id: comment.id,
          },
        }
      )
        .then(() => res.status(201).send({ message: "Comment updated" }))
        .catch((error) => res.status(400).send({ message: "Error: " + error }));
    })
    .catch((error) =>
      res.status(500).send({ message: "Comment not found - Error: " + error })
    );
};

module.exports.deleteComment = async (req, res) => {
  await Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      Comment.destroy({
        where: {
          id: comment.id,
        },
      })
        .then(() => res.status(200).json({ message: "Successfully deleted" }))
        .catch((error) => res.status(400).send({ message: "Error: " + error }));
    })
    .catch((error) =>
      res.status(500).send({ message: "Comment not found - Error: " + error })
    );
};
