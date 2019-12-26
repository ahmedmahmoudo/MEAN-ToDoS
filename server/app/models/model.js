const Database = require('../../database/db');

const db = new Database();

class Model {
    static get db() { return db; }
    static get table() { return ''; }

    static all() {
        let db = this.db;
        let table = this.table;
        return new Promise((resolve, reject) => {
            db.execute(`SELECT * FROM ${table}`, [], (err, results, fields) => {
                if(err) reject(err);
                resolve(results);
            });
        });
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.execute(`SELECT * FROM ${table} WHERE id = ? LIMIT 1`, [id], (err, results, fields) => {
                if(err) reject(err);
                console.log(results);
                resolve(results);
            });
        });
    }

    static where(field, value) {
        return new Promise((resolve, reject) => {
           this.db.execute(`SELECT * FROM ${table} WHERE ${field} = ?`, [value], (err, results, fields) => {
               if(err) reject(err);
               resolve(results);
           }) 
        });
    }

    static where(field, operator, value) {
        return new Promise((resolve, reject) => {
            this.db.execute(`SELECT * FROM ${table} WHERE ${field} ${operator} ?`, [value], (err, results, fields) => {
                if(err) reject(err);
                resolve(results);
            });
        });
    }

    static save(fields, prepares, values) {
        return new Promise((resolve, reject) => {
           this.db.execute(`INSERT INTO ${table} ${fields} VALUES ${prepares}`, [values], (err, results, fields) => {
               if(err) reject(err);
               resolve(results);
           });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            this.db.execute(`DELETE FROM ${table} WHERE id = ?`, [this.id], (err, results, fields) => {
                if(err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = Model;