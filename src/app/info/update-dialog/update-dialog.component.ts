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
    this.UpdateForm.get("firstName").setValue(this.data.firstName);
    this.UpdateForm.get("lastName").setValue(this.data.lastName);
    this.UpdateForm.get("nickname").setValue(this.data.nickname);
    this.UpdateForm.get("phone").setValue(this.data.phone);
  }

  onSubmit(value) {
    //alert(`You have deleted it.`);
    // console.log(`You have deleted it.`);
    // this.dialogRef.close();
    // window.location.reload();
    // this.auth.deleteUser(this.data.userUid);
    //console.log(value.firstName);
    this.auth.updateUser(this.data.uid, value);
    console.log(`You have updated main info.`);
    this.dialogRef.close();
    //window.location.reload();
  }

  closeModal() {
    this.dialogRef.close();
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

  //onSubmit(value) {}
}
