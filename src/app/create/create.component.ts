import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from '../models/models';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { AuthService } from "../shared/services/auth.service";
import { CountryService } from "../shared/services/country.service";
import { Store } from '@ngxs/store';
import { GetCountries } from "../store/action/countries.action"

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  allCountries: Country;

  //Form Variables
  ProfileForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  nickname: FormControl;
  phone: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  addressType: FormControl;
  address: FormControl;
  country: FormControl;
  postalCode: FormControl;

  // Switch form parts
  nextFormControl: boolean = false;
  summaryFormControl: boolean = false;
  submitted: boolean = false;

  constructor(
    private store: Store,
    public authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.createFormControl();
    this.createFormGroup()

    this.store.subscribe(res => this.allCountries = res.countries.countries);
    // this.countryService.loadCountries()
    //   .subscribe(res => {
    //     if (res) {
    //       this.allCountries = res;
    //     }
    //   });
  }

  createFormControl() {
    this.firstName = new FormControl([null], Validators.required);
    this.lastName = new FormControl([null], Validators.required);
    this.nickname = new FormControl(
      [null],
      [Validators.required, Validators.minLength(6)]
    );
    this.phone = new FormControl(
      [null],
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]
    );
    this.email = new FormControl(
      [null],
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
      ]
    );
    this.password = new FormControl(
      [null],
      [Validators.required, Validators.minLength(6)]
    );
    this.confirmPassword = new FormControl([null], Validators.required);
    this.addressType = new FormControl([null], Validators.required);
    this.address = new FormControl([null], Validators.required);
    this.country = new FormControl([null], Validators.required);
    this.postalCode = new FormControl(
      [null],
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(4)
      ]
    );
  }

  createFormGroup() {
    this.ProfileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      addressType: this.addressType,
      address: this.address,
      country: this.country,
      postalCode: this.postalCode
    });
  }

  onSelectChange() {
    //let us = this.firebaseService.getUser(this.authService.userData.uid);

    //console.log(us.firstName);

    //console.log(this.ProfileForm, 'Form');
    //console.log(this.ProfileForm.value, 'Value');
    //this.http.post<any>('blablabla', this.ProfileForm.value)
  }


  onSubmit() {
    this.authService.SignUp(this.ProfileForm.value.email, this.ProfileForm.value.password, this.ProfileForm.value);
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