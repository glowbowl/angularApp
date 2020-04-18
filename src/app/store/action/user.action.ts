import { UserSignUp} from "../../models/models";

export class loadAllUsers {
    static readonly type = '[Users] Load All Users';
}

export class CreateUser {
    static readonly type = '[Users] Create User';
    constructor(public payload: UserSignUp){}
}