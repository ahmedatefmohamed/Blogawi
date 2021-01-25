const express = require('express');
const blog = require('./Blog');
const user = require('./User');
const authMiddleware = require('../middlewares/UserAuth');

const router = express();
router.use('/users', user);
router.use('/blogs', authMiddleware, blog);

module.exports = router;
