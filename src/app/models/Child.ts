import { Account } from "./Account";
import { ChildContact } from "./ChildContact";
import { Registration } from "./Registration";

export class Child {
    constructor(
        public id: number,
        public birthDate: String,
        public gender: String,
        public firstName: String,
        public lastName: String,
        public address: String,
        public phoneNumber: String,
        public doctorClinic: String,
        public immunizations: boolean,
        public chickenPox: boolean,
        public medicalPhoneNumber: String,
        public healthCareNumber: String,
        public allergy: String,
        public medicalConditions: String,
        public medications: boolean,
        public postalCode: String,
        public childContactList: ChildContact[],
        public account: Account,
        public registrationList: Registration[]
    ) {}
}