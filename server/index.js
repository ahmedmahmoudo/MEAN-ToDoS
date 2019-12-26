const express = require('express');
const path = require('path');
const User = require('./app/models/user');
const app = express();
const {check, validationResult} = require('express-validator');
const {register, login, getAllUsers, updateUser} = require('./app/controllers/usercontroller');
const {checkIfAuthed} = require('./app/middleware/auth');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(checkIfAuthed);

app.post('/api/users/create', [
    check('email').isEmail(),
    check('first_name').isString().isLength({min: 3}),
    check('last_name').isString().isLength({min: 3}),
    check('password').isString().isLength({min: 6})
], register);

app.post('/api/users/login', [
    check('email').isEmail(),
    check('password').isString()
], login);

app.get('/api/users/', getAllUsers);
app.put('/api/users/update', updateUser);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));