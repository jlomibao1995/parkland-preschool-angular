import { Child } from "./Child";
import { Classroom } from "./Classroom";
import { PaymentDetails } from "./PaymentDetails";

export class Registration {
    constructor(
        public id: number,
        public active: boolean,
        public status: String,
        public registrationDate: String,
        public fullyPaid: boolean,
        public child: Child,
        public classroom: Classroom,
        public paymentList: PaymentDetails[]
    ){}
}