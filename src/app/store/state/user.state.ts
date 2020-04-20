import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { UserSignUp } from "../../models/models";
import { LoadAllUsers, CreateUser } from "../action/user.action";
import { AuthService } from "../../shared/services/auth.service";
import { tap, take, map } from "rxjs/operators";
import { from } from "rxjs";

export class UserStateModel {
    users: UserSignUp[];
    createUser: UserSignUp;
}

@State<UserStateModel>({
    name: "UserState",
    defaults: {
        users:[],
        createUser: null,
    }
})
@Injectable()
export class UserState {

    constructor(
        private auth: AuthService
    ){}

    @Selector()
    static getAllUsers(state: UserStateModel){
        return state.users;
    }

    @Action(LoadAllUsers)
    LoadAllUsers(ctx: StateContext<UserStateModel>) {
        return this.auth.getAll().pipe(
            tap(res => {
                ctx.patchState({...ctx, users: res});
            })
        );
    }

    @Action(CreateUser)
    CreateUser(ctx: StateContext<UserStateModel>, action: CreateUser){
        from(this.auth.SignUp(action.payload.email, action.payload.password, action.payload))
        //return from(this.auth.SignUp(action.payload.email, action.payload.password, action.payload))//.pipe(
            //tap(res => {
                ctx.patchState({
                    ...ctx,
                    createUser: action.payload
                });
            //})
        //);
    }

}