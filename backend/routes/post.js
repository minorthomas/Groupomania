const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/postsCtrl");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/all/:id", postCtrl.findAllPostsForOne);
router.get("/:id", postCtrl.findOnePost);
router.get("/", postCtrl.findAllPosts);
router.delete("/", auth, postCtrl.deletePost);

module.exports = router;
