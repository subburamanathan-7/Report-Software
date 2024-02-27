const express = require('express');
const router = express.Router();

const {authenticateStudent} = require('../middlewares/authMiddlewares');
const {getStudentDetails, login, register} = require('../controllers/studentController');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/scores').get(authenticateStudent,getStudentDetails);
module.exports = router;
