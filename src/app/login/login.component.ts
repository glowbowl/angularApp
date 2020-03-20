import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] })
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl(
        [null],
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        ]
      ),
      password: new FormControl(
        [null],
        [Validators.required, Validators.minLength(6)]
      ),
    });
  }

  get email() {
    return this.LoginForm.get("email");
  }

  get password() {
    return this.LoginForm.get("password");
  }

  onSubmit(){
    this.authService.SignIn(this.LoginForm.value.email, this.LoginForm.value.password);
  }
}
