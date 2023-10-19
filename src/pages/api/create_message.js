import { getDatabase, closeDBInstance } from "@/lib/db";

const createMessage = async (db, queryParams) => {
    console.log("here");
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO messages (name, display, message) VALUES(\'${queryParams.name}\', ${queryParams.display}, \'${queryParams.message}\')`;
        console.log(query);
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

export default async function handler(req, res) {
    const db = getDatabase();
    try {
        await createMessage(db, req.query);
        closeDBInstance(db);
        res.status(200).json("Successfully uploaded post");
    } catch (e) {
        closeDBInstance(db);
        res.status(400).json("Error uploading post");
    }
}