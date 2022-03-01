//Imports
const router = require("express").Router();
const postController = require("../controllers/postController");
const { auth } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();

//Post
router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getOnePost);
router.post("/", auth, upload.single("file"), postController.createPost);
router.put("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

//Export
module.exports = router;
