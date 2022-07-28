const express = require('express');
const path = require('path');
const app = require('../app');
const router = express.Router();
const myController = require('../controllers/myController');
const userController = require('../controllers/userController');

router.get('/form', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/form.html'));
  });
router.post('/register', userController.register);
router.get('/', myController.myMethod);
router.get('/about', myController.aboutMe);

module.exports = router;