const {database, Model, seq} = require('../database/db');

class User extends Model {}
User.init({
    first_name: {
        type: seq.STRING,
    },
    last_name: {
        type: seq.STRING
    },
    email: {
        type: seq.STRING,
        unique: true
    },
    password: {
        type: seq.STRING,
        
    },
    role: {
        type: seq.STRING
    },
    token_createdAt: {
        type: seq.DATE
    }
}, {sequelize: database, modelName: 'users'});

class Project extends Model {}
Project.init({
    name: {
        type: seq.STRING,
        unique: true
    },
    access: {
        type: seq.ENUM('Public', 'Private')
    }
}, {sequelize: database, modelName: 'projects'});

Project.belongsTo(User);
User.hasMany(Project);

module.exports = {User, Project};

