const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/user');
const moment = require('moment');
const checkIfAuthed = (req, res, next) => {
    if(req.originalUrl === '/api/users/login' || req.originalUrl === '/api/users/register') return next();

    if(req.headers && req.headers.authorization) {
        try {
            let jwtToken = jwt.verify(req.headers['authorization'], config.development.jwt_secret);
            let id = jwtToken.id;
            let time = jwtToken.time;
            User.findByPk(id).then(user => {
                if(user) {
                    req.user = user;
                    if(moment(req.user.get('token_createdAt')).isSame(time)) {
                        return next();
                    }
                }
                return res.status(401).json({msg: 'Unauthorized'});        
            })
        } catch(err) {
            console.log(err);
            return res.status(401).json({msg: 'Unauthorized'});
        }
    } else {
        return res.status(401).json({msg: 'Unauthorized'});
    }
}

module.exports = {checkIfAuthed};