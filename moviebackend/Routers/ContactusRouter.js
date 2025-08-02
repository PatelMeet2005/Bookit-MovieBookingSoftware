const express = require('express');
const { contactUser, getcontact } = require('../Controllers/ContactusContollers');
const router = express.Router();

router.post('/contact',contactUser);
router.get('/getcontact',getcontact);

module.exports = router;