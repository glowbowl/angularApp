import { LoginModel } from "./../../models/models"

export class LoginUser {
    static readonly type = '[User] Login User';
    constructor(public payload: LoginModel){}
}

export class CreateUserLogin {
    static readonly type = '[User] Create User Login';
    constructor(public payload: LoginModel) { }
}

export class LogoutUser {
    static readonly type = '[User] Logout User';
}