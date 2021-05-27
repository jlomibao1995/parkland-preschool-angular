import { Registration } from "./Registration";

export class PaymentDetails {
    constructor(
        public id: number,
        public invoiceId: String,
        public payee: String,
        public payer: String,
        public paymentStatus: String,
        public subTotal: number,
        public serviceFees: number,
        public total: number,
        public datePaid: String,
        public paymentMonth: String,
        public description: String,
        public paymentMethod: String,
        public year: number,
        public registration: Registration
    ) {

    }
}