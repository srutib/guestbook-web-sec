import { getDatabase, closeDBInstance } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";

const filter = async (db, queryParams, userId) => {
    const nameQuery = queryParams.name;
    if (nameQuery == '') { // No name provided
        return [];
    }

    return new Promise((resolve, reject) => {
        const query = "SELECT message FROM messages WHERE name = ? AND user_id = ?";
        console.log(query);
        db.execute(query, 
        [`${nameQuery}`, userId],
        (err, rows, fields) => {
            console.log(fields);
            if (fields.length > 1 && fields[0].constructor == Array) {
                rows = rows[0]; // I have no idea why it returned an array of arrays but need to extract it out
            }
            console.log(rows);
            if (err) {
                console.error("Error getting messages");
                return reject(err);
            }
            return resolve(rows.map(r => r.message));
        });
    });
};

export default async function handler(req, res) {
    const db = getDatabase();

    const userId = verifyJWT(req.headers["authorization"])
    if (userId === null) {
        res.status(401).json("Login token expired.");
        return;
    }

    try {
        const messages = await filter(db, req.query, userId);
        closeDBInstance(db);
        res.status(200).json(messages);
    } catch (e) {
        console.error(e);
        closeDBInstance(db);
        res.status(400).json(e.message);
    }
};