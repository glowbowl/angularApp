import { CreateUserModel} from "../../models/models";

export class LoadAllUsers {
    static readonly type = '[Users] Load All Users';
}

export class CreateUser {
    static readonly type = '[Users] Create User';
    constructor(public payload: CreateUserModel){}
}