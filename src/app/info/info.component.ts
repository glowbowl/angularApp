import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Store, Select} from "@ngxs/store";
import { LoadAllUsers } from "../store/action/user.action"
import { UserState } from "../store/state/user.state";

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DeleteDialogComponent } from "./delete-dialog/delete-dialog.component";
import { UpdateDialogComponent } from "./update-dialog/update-dialog.component";
import { UpdateAdditionalComponent } from "./update-additional/update-additional.component";
import { Observable } from 'rxjs';
import { UserSignUp } from '../models/models';

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit {
  SearchForm: FormGroup;
  UpdateForm: FormGroup;

  allUsers: Array<object>;
  searchedUser;
  searched: Boolean = false;
  closed: Boolean = false;
  additional: Boolean = false;

  @Select(UserState.getAllUsers) allUsersList: Observable<UserSignUp[]>;

  constructor(public auth: AuthService, public dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {

    this.store.dispatch(new LoadAllUsers());

    let item = this.auth.getAll();
    item.subscribe(snapshot => {
      this.allUsers = snapshot;
    });

    this.SearchForm = new FormGroup({
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
      ),
      email: new FormControl(
        [null],
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        ]
      )
    });
  }

  get nickname() {
    return this.SearchForm.get("nickname");
  }

  get phone() {
    return this.SearchForm.get("phone");
  }

  get email() {
    return this.SearchForm.get("email");
  }

  onSubmit(value) {
    let uid;
    for (let i = 0; i < this.allUsers.length; i++) {
      if (
        (value.nickname === this.allUsers[i]["nickname"] &&
          value.phone === this.allUsers[i]["phone"]) ||
        (value.nickname === this.allUsers[i]["nickname"] &&
          value.email === this.allUsers[i]["email"]) ||
        (value.phone === this.allUsers[i]["phone"] &&
          value.email === this.allUsers[i]["email"]) ||
        (value.nickname === this.allUsers[i]["nickname"] &&
          value.phone === this.allUsers[i]["phone"] &&
          value.email === this.allUsers[i]["email"])
      ) {
        uid = this.allUsers[i]["uid"];
        break;
      }
      //make invalid search check
    }

    let item = this.auth.getUser(uid);
    item.subscribe(snapshot => {
      this.searchedUser = snapshot;
      this.closed = false;
      this.searched = true;
    });
  }

  additionalTable() {
    this.additional = !this.additional;
  }

  resetForm() {
    this.additional = false;
    this.closed = true;
    this.SearchForm.reset({});
  }

  update(uid) {
    let item = this.auth.getUser(uid);
    item.subscribe(snapshot => {
      console.log(snapshot);
    });
  }

  updateDialogMain(value) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "325px";
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      firstName: value.firstName,
      lastName: value.lastName,
      nickname: value.nickname,
      phone: value.phone,
      uid: value.uid
    };
    const modalDialog = this.dialog.open(
      UpdateDialogComponent,
      dialogConfig
    );
  }

  updateDialogAdditional(value) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "325px";
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      addressType: value.addressType,
      country: value.country,
      postalCode: value.postalCode,
      address: value.address,
      uid: value.uid
    };
    const modalDialog = this.dialog.open(
      UpdateAdditionalComponent,
      dialogConfig
    );
  }

  deleteConfirm(uid): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      userUid: uid
    };
    const modalDialog = this.dialog.open(
      DeleteDialogComponent,
      dialogConfig
    );
    // modalDialog.afterClosed().subscribe(result => {
    //   console.log("Closed");
    // });
  }
}
