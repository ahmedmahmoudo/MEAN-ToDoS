const { check } = require('express-validator');
const {register, login, getAllUsers, updateUser, getUser, getProjects, newProject, updateProject} = require('../app/controllers/usercontroller');
const express = require('express');
const router = express.Router();


/**
 * User Routes
 */
router.post('/users/new', [
    check('email').isEmail(),
    check('first_name').isString().isLength({min: 3}),
    check('last_name').isString().isLength({min: 3}),
    check('password').isString().isLength({min: 6})
], register);

router.post('/users/login', [
    check('email').isEmail(),
    check('password').isString()
], login);

router.get('/users', getUser);
router.put('/users/update', updateUser);

/**
 * User Projects Routes
 */
router.get('/projects', getProjects);
router.post('/projects/new', [
    check('name').isString(),
    check('access').isIn(['Public', 'Private'])
], newProject);
router.put('/projects/:projectId/update', updateProject);


module.exports = router;