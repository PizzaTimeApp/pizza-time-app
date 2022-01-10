export class User {
    id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: Date;
    gender: Gender
    phone: string;
    address: string;
    city: string;
    zip: number;
}

export enum Gender {
    male = "male",
    female = "female"
}