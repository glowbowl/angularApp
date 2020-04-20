import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from "@ngxs/store"
import { LoginModel } from "./../../models/models"
import { AuthService } from "./../../shared/services/auth.service";
import { LoginUser, LogoutUser, CreateUserLogin } from "../action/loginUser.action";

export class LoginUserStateModel {
    user: LoginModel;
}

@State<LoginUserStateModel>({
    name: "loggedinUser",
    defaults: {
        user: null
    }
})
@Injectable()
export class LoginUserState {

    constructor(private auth: AuthService) {
    }

    @Selector()
    static getCurrentUserEmail(state: LoginUserStateModel):string{
        return state.user.email;
    }

    @Selector()
    static userExist(state: LoginUserStateModel): boolean {
        return state.user? true: false;
    }

    @Action(LoginUser)
    LoginUser(ctx: StateContext<LoginUserStateModel>, action: LoginUser){
        const state = ctx.getState();
        this.auth.SignIn(action.payload.email, action.payload.password);
        ctx.patchState({
            ...state,
            user: action.payload
        });
    }

    @Action(CreateUserLogin)
    CreateUserLogin(ctx: StateContext<LoginUserStateModel>, action: CreateUserLogin) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            user: action.payload
        });
    }

    @Action(LogoutUser)
    LogoutUser(ctx: StateContext<LoginUserStateModel>) {
        this.auth.SignOut();
        ctx.setState({
            user: null,
        });
    }

}