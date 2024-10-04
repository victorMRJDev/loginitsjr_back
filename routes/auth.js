const express = require('express');
const router = express.Router();

const {addUser, loginUser} = require('../controller/auth');



router.post('/new', addUser)

router.post('/', loginUser);

module.exports = router;