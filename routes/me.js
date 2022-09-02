const express = require('express');
const path = require('path');
const app = require('../app');
const router = express.Router();//containing only the routing logic introduced in express 4.0
const myController = require('../controllers/myController');
const userController = require('../controllers/userController');
const csrf = require('csurf'); //csrf middleware
var bodyParser = require('body-parser');
csrfProtection = csrf({ cookie: true }); 
let parseForm =bodyParser.urlencoded({extended:false});

router.get('/form', csrfProtection,function(req, res, next) {
  console.log( req.csrfToken());
  res.render("user/form", {csrfToken: req.csrfToken(),
    messages:{"status":200,success:'success',error:false},
  });
  });
  router.get('/update/email', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/../views/user/updateForm.html'));
  });
router.post('/register',parseForm,csrfProtection, userController.register);
//router.post('/update', userController.update);
router.post('/delete/user', userController.deleteUser);
router.post('/update/user', userController.update);


router.get('/list', userController.list);

router.get('/', myController.myMethod);
router.get('/about', myController.aboutMe);

//cookie test
router.get('/user/:name', userController.user1); //set
router.get('/who', userController.user2); // view
router.get('/session',userController.sessionCount) //session test

//route grouping => a route have both get and post 
router.route('/login')
   .get((req, res) => {
       res.send('display login form');
   })
   .post((req, res) => {
      res.send('process login form');
  }) 

module.exports = router;