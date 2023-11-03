export class Name {
    constructor(name) {
        // check to see if name matches a pattern
        const validName = this.isValidName(name);
        if (validName) this.name = name;
        else {
            // either accept or reject or enforce

            // Accept/reject version
            throw new Error("Invalid name.");

            // Enforce version (uncomment below if needed)
            //this.name = this.enforce(name);
        }

    }

    isValidName(name) {
        const namePattern = /^[A-Za-z.-\s]+$/;
        return namePattern.test(name);
    }

    enforce(name) {
        // modify
        return name.replace(/[^A-Za-z.-\s]/g, '');
    }

    get() {
        return this.name;
    }
}