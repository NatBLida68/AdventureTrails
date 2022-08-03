const express = require('express');
const path = require('path');
const app = require('../app');
const router = express.Router();
const myController = require('../controllers/myController');
const userController = require('../controllers/userController');

router.get('/form', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/form.html'));
  });
  router.get('/update/email', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/updateForm.html'));
  });
router.post('/register', userController.register);
router.post('/update', userController.update);
router.get('/delete/:userName', userController.deleteUser);


router.get('/list', userController.list);

router.get('/', myController.myMethod);
router.get('/about', myController.aboutMe);

//cookie test
router.get('/user/:name', userController.user1); //set
router.get('/who', userController.user2); // view
router.get('/session',userController.sessionCount) //session test

module.exports = router;