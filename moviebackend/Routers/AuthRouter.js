const express = require('express');
const { RegisterUser, LoginUser, LogoutUser, getRegisterUser,LogoutAdmin } = require('../Controllers/AuthControllers');
const router = express.Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/logout',LogoutUser);
router.get('/getregisterdata',getRegisterUser);
router.post('/adminlogout',LogoutAdmin);

module.exports = router;