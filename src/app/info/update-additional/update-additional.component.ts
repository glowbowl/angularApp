import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-update-additional",
  templateUrl: "./update-additional.component.html",
  styleUrls: ["./update-additional.component.scss"]
})
export class UpdateAdditionalComponent implements OnInit {
  UpdateForm: FormGroup;

  constructor() {}

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
