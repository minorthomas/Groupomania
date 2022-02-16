const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;

exports.createPost = (req, res, next) => {
  console.log("ligne 14 req.body" + req.body.postUrl);
  let imagePost = "";
  if (req.file) {
    imagePost = `${req.protocol}://${req.get("host")}/images/${req.fipostname}`;
  }
  const post = new Post({
    UserId: req.body.UserId,
    post: req.body.post,
    postUrl: imagePost,
  });
  console.log(post);
  post
    .save()
    .then(() => res.status(201).json({ message: "Publication réussie" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
  Post.findAll({
    include: { model: User, required: true, attributes: ["userName"] },

    order: [["id", "DESC"]],
  })
    .then((posts) => {
      const list = posts.map((post) => {
        return Object.assign(
          {},
          {
            id: post.id,
            createdAt: post.createdAt,
            post: post.post,
            postUrl: post.postUrl,
            UserId: post.UserId,
            userName: post.User.userName,
            isActive: post.User.isActive,
          }
        );
      });
      res.status(200).json({ list });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.findOnePost = (req, res, next) => {
  const onePost = {};
  Post.findOne({
    where: { id: req.params.id },
    include: {
      model: User,
      required: true,
      attributes: ["userName"],
    },
    order: [["id", "DESC"]],
  })
    .then((post) => {
      onePost.id = post.id;
      onePost.userId = post.UserId;
      onePost.userName = post.User.userName;
      onePost.createdAt = post.createdAt;
      onePost.post = post.post;
      onePost.postUrl = post.postUrl;
      res.status(200).json(onePost);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.findAllPostsForOne = (req, res, next) => {
  let list = "";
  Post.findAll({
    where: { UserId: req.params.id },
  })
    .then((res) => {
      list = res;
      res.status(200).json({ list });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.deletePost = (req, res, next) => {
  console.log(" POST DELETION PROCESS ");
  console.log(" post Id is: " + req.query.postId);
  console.log(" post User Id is : " + req.query.postUid);
  console.log(" User Id who ask the deletion is : " + req.query.uid);

  console.log(
    " is it the author of the post who ask the deletion or is he Admin (admin is uid=1) ? "
  ) + console.log(" if True => delete the post ");
  console.log(" if False => unauthorized ");

  console.log(req.query.postUid == req.query.uid || req.query.uid == 1);
  if (req.query.postUid == req.query.uid || req.query.uid == 1) {
    Comment.destroy({ where: { PostId: req.query.postId } });
    Post.destroy({ where: { id: req.query.postId } })
      .then((res) => {
        res
          .status(200)
          .json({ message: "Post and its comments have been destroyed" });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ message: " unauthorized " });
  }
};
