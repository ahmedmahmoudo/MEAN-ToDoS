const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const {User} = require('../models');
const moment = require('moment');
const checkIfAuthed = (req, res, next) => {
    if(req.originalUrl === '/api/users/login' || req.originalUrl === '/api/users/new') return next();

    if(req.headers && req.headers.authorization) {
        try {
            let token = req.headers['authorization'];
            let jwtToken = jwt.verify(token, config.development.jwt_secret);
            let id = jwtToken.id;
            let time = jwtToken.time;
            User.findByPk(id).then(user => {
                if(user) {          
                    req.user = user;
                    req.token = token;
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
        console.log(`Token not attached`);
        return res.status(401).json({msg: 'Unauthorized token is not attached'});
    }
}

module.exports = {checkIfAuthed};