//Imports
const router = require("express").Router();
const commentController = require("../controllers/commentController");

//Comment
router.get("/:id/display", commentController.getAllComments);
router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

//Export
module.exports = router;
