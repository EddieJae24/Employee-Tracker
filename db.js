import { Pool } from 'pg';
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'employee_db',
  password: 'your_password',
  port: 5432
});

export default pool;
