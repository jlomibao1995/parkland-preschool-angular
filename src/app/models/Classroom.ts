export class Classroom {
    constructor(public id: number,
        public capacity: number,
        public startDate: Date,
        public endDate: Date,
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