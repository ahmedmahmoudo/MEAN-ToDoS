const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const moment = require('moment');
const saltRounds = 10;


const login = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    User.findOne({where: {email: req.body.email}}).then(user => {
        if(!user) return res.status(400).json({msg: 'Invalid username or Password'});

        bcrypt.compare(req.body.password, user.get('password')).then((success) => {
            if(success) {
                let time = moment().format();
                let token = jwt.sign({id: user.get('id'), time}, config.development.jwt_secret, {expiresIn: 60*60});
                let data = user.toJSON();
                user.update({token_createdAt: time}).then(success => {
                    data.token = token;
                    return res.json(data);
                }).catch(error => {
                    console.log(error);
                    return res.status(500).json({msg: 'Invalid Request'});
                });
            } else {
                return res.status(400).json({msg: 'Invalid username or password'});
            }

        })
    });

}

const register = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err) console.log(err);
        User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: hash,
                role: 'user'
            }).then(user => res.json(user)).catch(err => {
                if(err.original.code == 'ER_DUP_ENTRY') {
                    return res.status(400).json({msg: 'Email already exists'});
                }
                return res.status(500).json({msg: 'Unhandled Error'});
            });
    });
}


const getAllUsers = (req, res) => {
    if(req.user.role === 'user') {
        User.findAll().then(users => {
            if(users.length > 0) {
                res.json(users)
            } else {
                res.status(404).json({msg: 'There are no registered users!'});
            }
        });
    } else {
        console.log(req.user);
        return res.status(404).json({msg: '404'});
    }
}

const updateUser = async (req, res) => {
    if(Object.keys(req.body).length > 0) {
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }
        req.user.update(req.body).then(updated => {
            if(updated) {
                res.json({msg: 'Profile Updated'});
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({msg: 'Interal Error'});
        });
    } else {
        res.status(400).json({msg: 'Please include the fields you want to edit'});
    }
}

module.exports = {login, register, getAllUsers, updateUser};