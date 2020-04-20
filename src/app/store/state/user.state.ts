import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { UserSignUp } from "../../models/models";
import { LoadAllUsers, CurrentUser, ClearUsers } from "../action/user.action";
import { AuthService } from "../../shared/services/auth.service";
import { tap, take, map, findIndex } from "rxjs/operators";
import { from } from "rxjs";

export class UserStateModel {
    users: UserSignUp[];
    currentUser: UserSignUp;
}

@State<UserStateModel>({
    name: "UserState",
    defaults: {
        users:[],
        currentUser: null,
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

    @Selector()
    static getCurrentUserData(state: UserStateModel) {
        return (email: string) => {
            return state.users.filter(user =>  user.email === email )
        };
    }

    @Action(LoadAllUsers)
    LoadAllUsers(ctx: StateContext<UserStateModel>) {
        // return this.auth.getAll().pipe(
        //     tap(res => {
        //         const state = ctx.getState();
        //         ctx.setState({...state, users: res});
        //     })
        // );
        if (ctx.getState().users === null) {
            this.auth.getAll().subscribe(res => {
                if (res) {
                    const state = ctx.getState();
                    const loadedUsers = res;
                    ctx.patchState({ ...state, users: loadedUsers });
                }
            });
        }
    }

    @Action(CurrentUser)
    CurrentUser(ctx: StateContext<UserStateModel>, action: CurrentUser){
        return this.auth.getUser(action.payload.uid).pipe(
            tap(res => {
                const state = ctx.getState();
                ctx.setState({ ...state, currentUser: res });
            })
        );
    }

    @Action(ClearUsers)
    ClearUsers(ctx: StateContext<UserStateModel>){
        ctx.setState({
            users: null,
            currentUser: null,
        });
    }

}