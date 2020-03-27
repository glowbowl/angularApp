import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';

import { UserSignUp } from "../models/models";

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  SearchForm: FormGroup;
  UpdateForm: FormGroup;

  //items: Array<any>;

  items$;
  nicknameFilter$: BehaviorSubject<string | null>;
  emailFilter$: BehaviorSubject<string | null>;

  constructor(public auth: AuthService, afs: AngularFirestore) { 
    this.nicknameFilter$ = new BehaviorSubject(null);
    this.emailFilter$ = new BehaviorSubject(null);
    this.items$ = combineLatest(
      this.nicknameFilter$,
      this.emailFilter$
    ).pipe(
      switchMap(([size, color]) =>
        afs.collection('items', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (size) { query = query.where('size', '==', size) };
          if (color) { query = query.where('color', '==', color) };
          return query;
        }).valueChanges()
      )
    );
  }

  filterByNickname(nickname: string | null) {
    this.nicknameFilter$.next(nickname);
  }
  filterByEmail(email: string | null) {
    this.emailFilter$.next(email);
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
    
  }

  update(uid){
    //console.log(this.auth.getItem(uid));
    let item = this.auth.getItem(uid);
    item.subscribe(snapshot => {
      //let val = snapshot.val();
      //let name = snapshot.dm.proto.fields.firstName;
      console.log(snapshot.uid);

      // console.log(snapshot.type);
      // console.log(snapshot.key);
      // console.log(snapshot.payload.val());
    });
  }

  delete(uid){
    this.auth.deleteUser(uid);
  }

}
