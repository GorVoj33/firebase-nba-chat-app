export class UserClass {
    // firstName: string;
    // lastName: string;
    photoUrl: string;
    email: string;
    fullName :string;
    constructor(name,email,photo) {
        this.fullName = name;
        this.email = email;
        this.photoUrl = photo;
    }
}