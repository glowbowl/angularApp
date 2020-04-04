import { Component, Inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"]
})
export class DeleteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    public auth: AuthService
  ) {}

  actionFunction() {
    //alert(`You have deleted it.`);
    console.log(`You have deleted it.`);
    this.dialogRef.close();
    window.location.reload();
    this.auth.deleteUser(this.data.userUid);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
