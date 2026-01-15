const express = require('express');
const { signup, login, getPreferences, updatePreferences } = require('../controllers/authController');
const { AuthMiddlware } = require('../middlewares/authMiddleware');
const router = express.Router();

// console.log("Auth Route Loaded", AuthMiddlware);
router.post("/signup", signup);
router.post("/login", login);
router.get("/preferences", AuthMiddlware, getPreferences);
router.put("/preferences", AuthMiddlware, updatePreferences);

module.exports = router;