const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
// const pool = mysql.createPool({
//     host: '3.141.193.244',
//     user: 'test',
//     port: '3306',
//     password: '980215',
//     database: 'ryu'
// });

const pool = mysql.createPool({
        host :'localhost',
        user:'root',
        //port:,
        password:'980215',
        database:'Demo'
});

// const pool = mysql.createPool({
//     host :'',
//     user:'',
//     port:'',
//     password:'',
//     database:''
// });


module.exports = {
    pool: pool
};