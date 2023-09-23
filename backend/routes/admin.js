var express = require('express');
var router = express.Router();
var Admin = require("../models/controllers/admin/admin");

router.post('/admin',Admin.create_training)
router.post('/dtrain',Admin.delete_training)
router.get('/get_trainings',Admin.view_trainings)
router.post('/restore',Admin.restore_trainings)
router.get('/deleted_trainings',Admin.deleted_trainings)
router.get('/view_request',Admin.view_request)

module.exports = router;
