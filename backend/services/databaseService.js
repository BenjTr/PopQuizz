const pg = require('pg');
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:admin@localhost:5432/postgres"
const pool = new pg.Pool({connectionString})

/**
 * Find user by pseudo and his password
 * @param pseudo
 * @param password
 * @returns {Promise<User>}
 */
exports.findUserByPseudoAndPassword = async function (pseudo, password) {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT user_id, pseudo FROM "User" WHERE pseudo=$1 AND password=$2;', [pseudo, password])
        client.release()
        return res.rows[0]
    } catch (err) {
        client.release()
        throw new Error("Error with the query : " + err)
    }
}

/**
 * Find user by pseudo
 * @param pseudo
 * @returns {Promise<User>}
 */
exports.findUserByPseudo = async function (pseudo) {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT user_id, pseudo FROM "User" WHERE pseudo=$1 ;', [pseudo])
        client.release()
        return res.rows[0]
    } catch (err) {
        client.release()
        throw new Error("Error with the query : " + err)
    }
}

/**
 *
 * Return true if a user is added successfully
 * @param pseudo
 * @param password
 * @returns {Promise<boolean>}
 */
exports.addUser = async function (pseudo, password) {
    const client = await pool.connect()
    try {
        client.query('INSERT INTO "User" (pseudo, password) VALUES ($1,$2);', [pseudo, password])
        client.release()
        return true
    } catch (err) {
        client.release()
        throw new Error("Error with the query : " + err)
    }
}

/**
 * Update password of *pseudo*
 * @param pseudo
 * @param newPassword
 * @returns {Promise<boolean>}
 */
exports.updatePassword = async function(pseudo, newPassword){
    const client = await pool.connect()
    try {
        client.query('UPDATE "User" SET password = $2 WHERE pseudo = $1', [pseudo, newPassword])
        client.release()
        return true
    } catch (err) {
        client.release()
        throw new Error("Error with the query : " + err)
    }
}

