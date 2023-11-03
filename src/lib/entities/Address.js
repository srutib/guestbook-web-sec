export class Address {
    constructor(city, state) {
        this.state = state;
        const validCity = this.isValidCity(city);
        if (validCity) this.city = city;
        else {
            // either accept or reject or enforce

            // Accept/reject version
            throw new Error("Invalid city.");

            // Enforce version (uncomment below if needed)
            //this.city = this.enforce(city);
        }

        this.address = `${this.city}, ${this.state}`;
    }

    isValidCity(city) {
        const cityPattern = /^[A-Za-z.-\s]+$/;
        return cityPattern.test(city);
    }

    enforce(city) {
        return city.replace(/[^A-Za-z.-\s]/g, '');
    }

    get() {
        return this.address;
    }
}