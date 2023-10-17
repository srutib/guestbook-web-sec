import { getDatabase, closeDBInstance } from "@/lib/db";

const createMessage = async (db, queryParams) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO messages (name, display, message) VALUES(\'${queryParams.name}\', ${queryParams.display}, \'${queryParams.message}\')`;

        db.query(query, (err, rows, fields) => {
            if (err) {
                console.log(err);
                console.error("Error inserting message");
                return reject(err);
            }
            return resolve();
        });
    });
}

const getAllMessages = async (db, queryParams) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT name, message FROM messages WHERE display = 1;';
        db.query(query, (err, rows, fields) => {
            console.log(rows);
            if (err) {
                console.error("Error getting messages");
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

export default async function handler(req, res) {
    const db = getDatabase();
    if (req.query.message) {
        try {
            await createMessage(db, req.query);
            closeDBInstance(db);
            res.status(200).json("Successfully uploaded post");
        } catch (e) {
            closeDBInstance(db);
            res.status(400).json("Error uploading post");
        }
    } else {
        try {
            const messages = await getAllMessages(db, req.query);
            closeDBInstance(db);
            res.status(200).json(messages);
        } catch (e) {
            console.error(e);
            closeDBInstance(db);
            res.status(400).json("Error getting messages");
        }
    }
}