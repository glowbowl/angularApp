import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";

@Component({ templateUrl: "login.component.html" })
export class LoginComponent implements OnInit {
  email:string = "lyashko2@gmail.com";
  pass: string = "123123";
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSubmit(){
    this.authService.SignIn(this.email, this.pass);
  }
}
