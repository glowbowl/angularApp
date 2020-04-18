import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { LogoutUser } from "./store/action/loginUser.action"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(
    public router: Router,
    public auth: AuthService,
    private store: Store
  ){
  }

  signOut(){
    this.store.dispatch(new LogoutUser);
  }
}
