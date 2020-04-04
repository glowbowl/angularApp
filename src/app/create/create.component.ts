import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Countries } from '../models/models';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  allCountries: Countries;
  ProfileForm: FormGroup;
  nextFormControl: boolean = false;
  summaryFormControl: boolean = false;
  submitted: boolean = false;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.ProfileForm = new FormGroup({
      firstName: new FormControl([null], Validators.required),
      lastName: new FormControl([null], Validators.required),
      nickname: new FormControl(
        [null],
        [Validators.required, Validators.minLength(6)]
      ),
      phone: new FormControl(
        [null],
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(5),
          Validators.maxLength(10)
        ]
      ),
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
      confirmPassword: new FormControl([null], Validators.required),
      addressType: new FormControl([null], Validators.required),
      address: new FormControl([null], Validators.required),
      country: new FormControl([null], Validators.required),
      postalCode: new FormControl(
        [null],
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(4)
        ]
      )
    });
    this.http
      .get<any>("https://restcountries.eu/rest/v2/all")
      .subscribe(res => {
        if (res) {
          this.allCountries = res;
          //console.log(res);
        }
      });
  }

  get firstName() {
    return this.ProfileForm.get("firstName");
  }

  get lastName() {
    return this.ProfileForm.get("lastName");
  }

  get nickname() {
    return this.ProfileForm.get("nickname");
  }

  get phone() {
    return this.ProfileForm.get("phone");
  }

  get email() {
    return this.ProfileForm.get("email");
  }

  get password() {
    return this.ProfileForm.get("password");
  }

  get confirmPassword() {
    return this.ProfileForm.get("confirmPassword");
  }

  get addressType() {
    return this.ProfileForm.get("addressType");
  }

  get address() {
    return this.ProfileForm.get("address");
  }

  get country() {
    return this.ProfileForm.get("country");
  }

  get postalCode() {
    return this.ProfileForm.get("postalCode");
  }

  onSelectChange() {
    //let us = this.firebaseService.getUser(this.authService.userData.uid);

    //console.log(us.firstName);

    //console.log(this.ProfileForm, 'Form');
    //console.log(this.ProfileForm.value, 'Value');
    //this.http.post<any>('blablabla', this.ProfileForm.value)
  }


  onSubmit(value) {
    this.authService.SignUp(this.ProfileForm.value.email, this.ProfileForm.value.password, value);
  }


  showSummary() {
    this.summaryFormControl = !this.summaryFormControl;
  }

  nextForm() {
    this.nextFormControl = !this.nextFormControl;
  }
}

// user = {
//   name: 'Test1',
//   surName: 'Test2'
// }
// @Output() usrAdd =new EventEmitter<any>()