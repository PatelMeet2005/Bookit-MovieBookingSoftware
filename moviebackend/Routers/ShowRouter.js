const express = require('express');
const { showUser, getshow, deleteShow } = require('../Controllers/ShowControllers');
const router = express.Router();

router.post('/addshow',showUser);
router.get('/getshow',getshow);
router.delete('/deleteshow',deleteShow);

module.exports = router; 