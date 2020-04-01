import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { UserSignUp } from "../models/models";

import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  SearchForm: FormGroup;
  UpdateForm: FormGroup;

  //items: Array<any>;

  allUsers: Array<object>;
  searchedUser;
  searched: Boolean = false;

  constructor(public auth: AuthService, afs: AngularFirestore) { 
    
  }

  ngOnInit(): void {
    let item = this.auth.getAll();
    item.subscribe(snapshot => {
      this.allUsers = snapshot;
    });

    // this.auth.getUserData()
    //   .subscribe(result => {
    //     if (result) {
    //       this.items = result;
    //     }
    //     else {
    //       this.items = null;
    //     }
    //   });
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
    // console.log(this.allUsers);
    // this.allUsers.forEach(doc => {
    //   console.log(doc);
    // });
    this.searched = !this.searched;
    let item = this.auth.getUser("LvfbU9wbzBPaa8NpMKseN5rtQXV2");
    item.subscribe(snapshot => {
      this.searchedUser = snapshot;
    });
  }

  resetForm(){
    this.searched = !this.searched;
    console.log(this.searched);
    this.SearchForm.reset();
  }

  update(uid){
    let item = this.auth.getUser(uid);
    item.subscribe(snapshot => {
      console.log(snapshot);
    });
  }

  delete(uid){
    this.auth.deleteUser(uid);
  }

}
