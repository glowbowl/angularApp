import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currUser;
  items: Array<any>;

  constructor(public auth: AuthService) { 
  }

  ngOnInit(): void {
    this.auth.getUserData()
      .subscribe(result => {
        if (result){
            this.items = result;
        }
        else{
          this.items = null;
        }
      })
  }
}
