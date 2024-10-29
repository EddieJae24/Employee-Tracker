// setup.js
// this file will be used to set up the database schema and seed the database with some initial data.

import pool from './db';
import fs from 'fs';
// const fs = require('fs');
// const pool = require('./db');

const executeSQLFile = async (filePath) => {
    const sql = fs.readFileSync(filePath, 'utf-8');
    await pool.query(sql);
};

const setupDatabase = async () => {
    try {
        console.log('Setting up the database schema...');
        await executeSQLFile('./schema.sql');
        console.log('Schema created successfully.');

        console.log('Seeding the database...');
        await executeSQLFile('./seeds.sql');
        console.log('Database seeded successfully.');

        console.log('Setup complete.');
    } catch (error) {
        console.error('Error setting up the database:', error);
    } finally {
        pool.end();
    }
};

// Export the setupDatabase function to allow it to be imported in index.js
// export default setupDatabase;

export default setupDatabase;
