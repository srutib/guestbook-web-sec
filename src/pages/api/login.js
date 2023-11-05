import { getDatabase } from "@/lib/db";
import { generateJWT } from "@/lib/jwt";

const userExists = async (db, bodyParams) => {
    return new Promise((resolve, reject) => {
        const username = bodyParams.username;
        const password = bodyParams.password;

        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.execute(query,
            [username, password],
            (err, rows, fields) => {
                if (rows.length == 0) {
                    return reject("User or password does not exist");
                } else {
                    return resolve(rows[0]);
                }
            });
    });
}

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        const user = await userExists(db, req.body);
        const jwt = generateJWT(user, '10d');
        res.status(200).json(jwt);
    } catch (error) {
        res.status(401).json(error.message);
    }
}