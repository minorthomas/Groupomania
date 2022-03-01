//Imports
const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");
const { auth } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer();

//Auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//User
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

//Upload
router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadController.uploadProfilePicture
);

//Export
module.exports = router;
