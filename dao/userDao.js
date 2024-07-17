const { password } = require('pg/lib/defaults');
const pool = require('../db/db');
const { email } = require('react-admin');

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
}

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1' , [id]);
    return result.rows[0];
}

const createUsers = async (name, email, password) =>{
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    return result.rows[0];
}

const updateUser = async (id, name, email, password) =>{
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
        [name, email, password, id]
    );
    return result.rows[0];
}

const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
};

module.exports = {
    getUsers,
    getUserById,
    createUsers,
    updateUser,
    deleteUser,
};