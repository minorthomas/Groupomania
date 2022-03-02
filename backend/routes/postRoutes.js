//Imports
const router = require("express").Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const upload = multer();

//Post
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getOnePost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//Export
module.exports = router;
