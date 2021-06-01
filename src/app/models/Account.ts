export class Account {
    constructor(public id: number,
        public email: String,
        public firstName: String,
        public lastName: String,
        public address: String,
        public homePhoneNumber: String,
        public workPhoneNumber: String,
        public cellNumber: String,
        public role: String,
        public relationToChild: String,
        public active: boolean,
        public picturePass: String,
        public creationDate: String,
        public lastLoginDate: String,
        public activateAccountUuid: String,
        public resetPasswordUuid: String,
        public schoolAccessAllowed: boolean,
        public childList: []) {

        }
}