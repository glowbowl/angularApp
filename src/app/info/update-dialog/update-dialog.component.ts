import { Component, Inject } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent{

  constructor() { }

  ngOnInit(): void {
  }

}
