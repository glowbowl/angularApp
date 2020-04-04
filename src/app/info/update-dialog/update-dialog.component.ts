import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { MatInputModule } from "@angular/material/input";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-update-dialog",
  templateUrl: "./update-dialog.component.html",
  styleUrls: ["./update-dialog.component.scss"]
})
export class UpdateDialogComponent implements OnInit {
  UpdateForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
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
      )
    });
  }

  get firstName() {
    return this.UpdateForm.get("firstName");
  }

  get lastName() {
    return this.UpdateForm.get("lastName");
  }

  get nickname() {
    return this.UpdateForm.get("nickname");
  }

  get phone() {
    return this.UpdateForm.get("phone");
  }

  onSubmit(value) {}
}
