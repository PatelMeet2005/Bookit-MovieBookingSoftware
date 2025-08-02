const express = require('express');
const { addmovieUser,getaddmovie} = require('../Controllers/AdminAddMoviesControllers');
const upload = require('../FileFolder/MulterConfig');
const router = express.Router();

router.post('/addmoviedata', upload.fields([{ name: 'photo' }, { name: 'banner' }]), addmovieUser);
router.get('/getmoviedata',getaddmovie);

module.exports = router;