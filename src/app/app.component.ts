import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  mySubscription: any;

  title = "angularApp";
  constructor(
    public router: Router,
    public auth: AuthService,
  ){
  }

  signOut(path){
    this.auth.SignOut();//.then(() => {
      //window.location.reload();
      //})
    this.router.navigate([path]);
  }
}
