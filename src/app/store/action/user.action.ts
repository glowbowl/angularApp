import { UserSignUp } from "../../models/models";

export class LoadAllUsers {
    static readonly type = '[Users] Load All Users';
}

export class CurrentUser {
    static readonly type = '[Users] Current User';
    constructor(public payload: UserSignUp){}
}

export class ClearUsers {
    static readonly type = '[Users] Clear Users';
}