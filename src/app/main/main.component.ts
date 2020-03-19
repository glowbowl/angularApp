import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  items: Array<any>;

  constructor(public auth: AuthService, public firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.getUsers()
      .subscribe(result => {
        this.items = result;
      });
      console.log(this.items);
  }

}
