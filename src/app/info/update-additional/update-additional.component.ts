import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { HttpClient } from '@angular/common/http';
import { Countries } from '../../models/models';

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-update-additional",
  templateUrl: "./update-additional.component.html",
  styleUrls: ["./update-additional.component.scss"]
})
export class UpdateAdditionalComponent implements OnInit {
  allCountries: Countries;
  UpdateForm: FormGroup;

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateAdditionalComponent>,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
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
      }
    });
    this.UpdateForm.get("addressType").setValue(this.data.addressType);
    this.UpdateForm.get("address").setValue(this.data.address);
    this.UpdateForm.get("country").setValue(this.data.country);
    this.UpdateForm.get("postalCode").setValue(this.data.postalCode);
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

  get addressType() {
    return this.UpdateForm.get("addressType");
  }

  get address() {
    return this.UpdateForm.get("address");
  }

  get country() {
    return this.UpdateForm.get("country");
  }

  get postalCode() {
    return this.UpdateForm.get("postalCode");
  }
}
