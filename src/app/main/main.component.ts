import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Store, Select } from "@ngxs/store";
import { GetCountries } from "../store/action/countries.action"
import { LoadAllUsers } from "../store/action/user.action"
import { CountriesState } from "../store/state/countries.state"
import { LoginUserState, LoginUserStateModel } from "../store/state/loginUser.state"
import { Observable } from 'rxjs/internal/Observable';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currUser;
  name: string;
  country: boolean;
  userEx: boolean;

  @Select( CountriesState.countryExist) countryExist: Observable<boolean>;
  @Select( LoginUserState.userExist) userExist: Observable<boolean>;

  constructor(public auth: AuthService,
    private store: Store) { 
  }

  ngOnInit(): void {
    this.countryExist.subscribe(res => this.country = res);
    this.userExist.subscribe(res => this.userEx = res);
    if (!this.country){
      this.store.dispatch(new GetCountries());
    }
    if (this.userEx) {
      this.store.dispatch(new LoadAllUsers());
    }

    let item = this.auth.getAll();
    if (this.auth.userData){
      item.subscribe(snapshot => {
        if (snapshot != undefined){
          for (let i = 0; i < snapshot.length; i++) {
            if ( this.auth.userData.uid === snapshot[i]["uid"]) {
              this.name = snapshot[i]["firstName"];
              break;
            }
          }
        }
        else{
          this.name = null;
        }
      });
    }
  }
}
