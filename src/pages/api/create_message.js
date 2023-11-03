import { getDatabase, closeDBInstance } from "@/lib/db";
import { UserPost } from "@/lib/entities/UserPost";

const createMessage = async (db, queryParams) => {
    let user;
    try {
        user = new UserPost(queryParams.name, queryParams.message, queryParams.city, queryParams.state, queryParams.display);
    } catch (e) {
        throw new Error(e.message);
    }

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO messages (name, display, message, address) VALUES(?, ?, ?, ?)`;
        console.log(query);
        db.execute(query, 
        [`${user.getName()}`, user.getDisplay(), `${user.getMesssage()}`, `${user.getAddress()}`],
        (err, rows, fields) => {
            if (err) {
                console.err(err);
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
        res.status(400).json(e.message);
    }
}