import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  constructor(
    public router: Router,
    public auth: AuthService,
  ){
  }

  signOut(){
    this.auth.SignOut().then(() => {
      window.location.reload();
      })
  }
}
