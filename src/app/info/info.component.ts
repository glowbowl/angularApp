import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { UserSignUp } from "../models/models";

import { AngularFirestore } from '@angular/fire/firestore';
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

  items: Array<any>;

  allUsers: Array<any>;



  constructor(public auth: AuthService, afs: AngularFirestore) { 
    
  }

  ngOnInit(): void {
    this.auth.getUserData()
      .subscribe(result => {
        if (result) {
          this.items = result;
        }
        else {
          this.items = null;
        }
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
    // this.auth.getAll().subscribe(function (querySnapshot) {
    //   console.log(querySnapshot.docs);
    //   //this.users = doc.data();
    // });;
    this.auth.getAll().subscribe(function (querySnapshot) {
      querySnapshot.forEach(docs => {
        //console.log(docs.data());
        this.allUsers.push( docs.data());
      });
    });;
    console.log(this.allUsers);
  }

  update(uid){
    //console.log(this.auth.getItem(uid));
    let item = this.auth.getUser(uid);
    item.subscribe(snapshot => {
      //let val = snapshot.val();
      //let name = snapshot.dm.proto.fields.firstName;
      console.log(snapshot.uid);
      this.auth.getAll();
      // console.log(snapshot.type);
      // console.log(snapshot.key);
      // console.log(snapshot.payload.val());
    });
  }

  delete(uid){
    this.auth.deleteUser(uid);
  }

}
