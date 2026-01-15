const express = require('express');
const { AuthMiddlware } = require('../middlewares/authMiddleware');
const { getNews } = require('../controllers/newsController');
const router = express.Router();

router.get("/", AuthMiddlware, getNews);

module.exports = router;