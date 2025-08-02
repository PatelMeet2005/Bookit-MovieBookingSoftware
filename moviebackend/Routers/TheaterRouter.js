const express = require('express');
const { theaterUser, getTheater, deleteTheater } = require('../Controllers/TheaterControllers');
const router = express.Router();

router.post('/addtheater',theaterUser);
router.get('/gettheater',getTheater);
router.delete('/deletetheater/',deleteTheater);

module.exports = router;