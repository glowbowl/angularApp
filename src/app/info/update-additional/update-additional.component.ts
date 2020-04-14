import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../models/models';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { CountryService } from "../../shared/services/country.service";

@Component({
  selector: "app-update-additional",
  templateUrl: "./update-additional.component.html",
  styleUrls: ["./update-additional.component.scss"]
})
export class UpdateAdditionalComponent implements OnInit {

  allCountries: Countries[];
  //Form Variables
  UpdateForm: FormGroup;
  addressType: FormControl;
  address: FormControl;
  country: FormControl;
  postalCode: FormControl;

  constructor(
    private countryService: CountryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateAdditionalComponent>,
    public auth: AuthService
  ) { }

  ngOnInit(): void {

    this.createFormControl();
    this.createFormGroup();

    this.countryService.loadCountries()
      .subscribe(res => {
        if (res) {
          this.allCountries = res;
        }
      });
    this.addressType.setValue(this.data.addressType);
    this.address.setValue(this.data.address);
    this.country.setValue(this.data.country);
    this.postalCode.setValue(this.data.postalCode);
  }

  createFormControl() {
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
    this.UpdateForm = new FormGroup({
      addressType: this.addressType,
      address: this.address,
      country: this.country,
      postalCode: this.postalCode
    });
  }

  onSubmit(value) {
    this.auth.updateAdditionalUser(this.data.uid, value);
    console.log(value);
    console.log(`You have updated additional info.`);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
