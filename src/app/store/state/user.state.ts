import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { UserSignUp } from "../../models/models";
import { LoadAllUsers, CreateUser } from "../action/user.action";
import { AuthService } from "../../shared/services/auth.service";


@Injectable()
export class UserState {

}