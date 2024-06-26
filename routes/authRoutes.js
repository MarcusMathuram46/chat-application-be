const { login, register, getAllUsers, setAvatar, logout } = require('../controllers/userController');

const router = require('express').Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allUsers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout", logout);

module.exports = router;