import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currUser;
  name: string;

  constructor(public auth: AuthService) { 
  }

  ngOnInit(): void {
    let item = this.auth.getAll();
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
