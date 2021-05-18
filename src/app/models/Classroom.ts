export class Classroom {
    constructor(public id: number,
        public capacity: number,
        public startDate: String,
        public endDate: String,
        public enrolled: number,
        public ageGroup: number,
        public costPerMonth: number,
        public days: String,
        public description: String,
        public full: boolean,
        public openRegistration: boolean,
        public picturePass: String,
        public registrationList: []) {}
}