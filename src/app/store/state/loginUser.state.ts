import { Injectable } from '@angular/core';
import { State, Action, StateContext } from "@ngxs/store"
import { LoginModel } from "./../../models/models"
import { AuthService } from "./../../shared/services/auth.service";
import { LoginUser, LogoutUser } from "../action/loginUser.action";

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

    @Action(LoginUser)
    LoginUser(ctx: StateContext<LoginUserStateModel>, action: LoginUser){
        const state = ctx.getState();
        this.auth.SignIn(action.payload.email, action.payload.password);
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