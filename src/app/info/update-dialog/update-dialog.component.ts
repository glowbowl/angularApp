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
  //Form Variables
  UpdateForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  nickname: FormControl;
  phone: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.createFormControl();
    this.createFormGroup();
    
    this.firstName.setValue(this.data.firstName);
    this.lastName.setValue(this.data.lastName);
    this.nickname.setValue(this.data.nickname);
    this.phone.setValue(this.data.phone);
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
  }

  createFormGroup(){
    this.UpdateForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      nickname: this.nickname,
      phone: this.phone
    });
  }

  onSubmit(value) {
    this.auth.updateUser(this.data.uid, value);
    console.log(`You have updated main info.`);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
