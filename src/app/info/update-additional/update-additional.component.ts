import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Country } from '../../models/models';
import { Store } from '@ngxs/store';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { LoadAllUsers } from "../../store/action/user.action";

@Component({
  selector: "app-update-additional",
  templateUrl: "./update-additional.component.html",
  styleUrls: ["./update-additional.component.scss"]
})
export class UpdateAdditionalComponent implements OnInit {

  allCountries: Country;
  //Form Variables
  UpdateForm: FormGroup;
  addressType: FormControl;
  address: FormControl;
  country: FormControl;
  postalCode: FormControl;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateAdditionalComponent>,
    public auth: AuthService
  ) { }

  ngOnInit(): void {

    this.createFormControl();
    this.createFormGroup();

    this.store.subscribe(res => this.allCountries = res.countries.countries);

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
    this.store.dispatch(new LoadAllUsers());
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
