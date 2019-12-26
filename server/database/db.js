const seq = require('sequelize');
const database = new seq('todos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

database.authenticate().then(() => console.log('Database connected')).catch(err => console.log('Unable to connect to the database:',err));


module.exports = {database, Model: seq.Model, seq};

