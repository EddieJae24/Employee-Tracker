import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    // user: 'your_user', 
    host: 'localhost',
    database: 'employee_db',
    // password: 'your_password',
    port: 5432,
});

// module.exports = pool;
export default pool;
