import { Address } from "./Address";
import { Message } from "./Message";
import { Name } from "./Name";

export class UserPost {
    constructor(name, message, city, state, display) {
        this.name = new Name(name);
        this.message = new Message(message);
        this.address = new Address(city, state);
        this.display = display;
    }

    getName() {
        return this.name.get();
    }

    getMesssage() {
        return this.message.get();
    }

    getAddress() {
        return this.address.get();
    }

    getDisplay() {
        return this.display;
    }
}