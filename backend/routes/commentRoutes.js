//Imports
const router = require("express").Router();
const commentController = require("../controllers/commentController");
const { auth } = require("../middleware/authMiddleware");

//Comment
router.get("/:id/display", auth, commentController.getAllComments);
router.post("/", auth, commentController.createComment);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);

//Export
module.exports = router;
