import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription, Subject } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {

  mySubscription: any;

  title = "angularApp";
  constructor(
    public auth: AuthService,
  ){
    
    
  }

}
