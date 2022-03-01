//Imports
const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
// const { requireAuth } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();

//Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//User
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

//Upload
router.post(
  "/upload",
  upload.single("file"),
  uploadController.uploadProfilePicture
);

//Export
module.exports = router;
