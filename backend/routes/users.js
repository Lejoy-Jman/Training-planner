var express = require('express');
var router = express.Router();
var User = require("../models/controllers/user/user");
var Admin = require("../models/controllers/admin/admin");




///User routes
router.post("/",User.login);// for creating the user
router.post("/signin",User.create_user);// for creating the user
router.post('/register',User.register_training) //for registering user to the training
router.get("/get/:id",User.training_details)
router.get("/view_trainings/:id",User.view)
router.put('/unregister',User.unregister)
router.post('/request',User.addtrainers)

module.exports = router;
