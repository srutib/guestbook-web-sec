export class Message {
    constructor(message) {
        const validMessage = this.isValidMessage(message);
        if (validMessage) this.message = message;
        else {
            // either accept or reject or enforce

            // Accept/reject version
            throw new Error("Invalid message.");

            // Enforce version (uncomment below if needed)
            //this.message = this.enforce(message);
        }

    }

    isValidMessage(message) {
        // alphanumeric characters (with whitespace) + emojis
        const messagePattern = /^([A-Za-z0-9\s]|\p{Extended_Pictographic})+$/gu;
        return messagePattern.test(message);
    }

    enforce(message) {
        return message.replace(/[^A-Za-z.-\s]|\P{Extended_Pictographic}/g, '');
    }

    get() {
        return this.message;
    }
}