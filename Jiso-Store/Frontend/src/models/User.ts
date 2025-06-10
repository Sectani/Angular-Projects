export enum UserType {
    Admin  = "Admin",
    Member = "Member",
    Guest  = "Guest"
}

export class User {
    
    private _id!: number;
    public get id() : number | undefined {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    private _firstName: string;
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    private _lastName: string;
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    private _age: number;
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    private _role: string;
    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }

    constructor(firstname : string , lastname : string , Age : number , Email : string , Password : string , role : string){
        this._firstName = firstname;
        this._lastName = lastname;
        this._age = Age;
        this._email = Email;
        this._password = Password;
        this._role = role;
    }
          
}